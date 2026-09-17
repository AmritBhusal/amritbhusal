import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Marked } from "marked";

// Server-only: reads content/blog/*.md at build time (static export).
// content/blog/blogs.json lists which posts exist and in what order — a higher
// `order` sits higher in the list, so a new post just needs the next number up.
// Anything the manifest omits falls back to frontmatter, then to the content
// itself (title = first H1, excerpt = first paragraph) or the file's timestamps.

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const COVER_DIR = path.join(process.cwd(), "public", "blog");
const MANIFEST = path.join(BLOG_DIR, "blogs.json");

// Convention: a post's cover is public/blog/<slug>.<ext>. When the manifest gives
// the post a slug that differs from its filename, the image is just as likely to be
// named after the file, so try that too before giving up.
function findCover(...names: string[]): string {
  for (const name of names) {
    for (const ext of ["png", "jpg", "jpeg", "webp", "gif", "avif"]) {
      if (fs.existsSync(path.join(COVER_DIR, `${name}.${ext}`))) return `/blog/${name}.${ext}`;
    }
  }
  return "";
}

export interface Heading {
  id: string;
  text: string;
  level: number; // 2 or 3
}

// One row of content/blog/blogs.json. Only `file` and `order` are required;
// the rest override what would otherwise be derived from the markdown.
export interface BlogEntry {
  file: string;
  order: number;
  slug?: string;
  title?: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
}

export interface BlogPost {
  order: number;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string; // created
  updatedAt: string; // falls back to publishedAt
  html: string; // rendered body, headings carry ids
  headings: Heading[]; // for the table-of-contents
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// A fresh Marked instance whose h2/h3 get an id so the ToC can link to them.
function makeMarked() {
  const md = new Marked();
  md.use({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const id = slugify(text.replace(/<[^>]+>/g, ""));
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
    },
  });
  return md;
}

function parse(entry: BlogEntry): BlogPost {
  const file = entry.file;
  const slug = entry.slug ?? file.replace(/\.md$/, "");
  const fullPath = path.join(BLOG_DIR, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const stat = fs.statSync(fullPath);
  const { data, content } = matter(raw);
  const md = makeMarked();

  const tokens = md.lexer(content);

  // Derive title from the first H1, and drop that H1 from the rendered body
  // so it isn't duplicated under the page's own <h1>.
  const h1 = tokens.find((t) => t.type === "heading" && t.depth === 1) as
    | { text: string; raw: string }
    | undefined;
  const body = h1 ? content.replace(h1.raw, "") : content;

  const firstPara = tokens.find((t) => t.type === "paragraph") as
    | { text: string }
    | undefined;

  // ToC: h2/h3 only (same slug rule as the renderer).
  const headings: Heading[] = tokens
    .filter((t) => t.type === "heading" && ((t as { depth: number }).depth === 2 || (t as { depth: number }).depth === 3))
    .map((t) => {
      const h = t as unknown as { depth: number; text: string };
      return { id: slugify(h.text), text: h.text, level: h.depth };
    });

  const iso = (d: Date) => d.toISOString().slice(0, 10);
  const publishedAt = (entry.publishedAt ?? data.publishedAt)
    ? String(entry.publishedAt ?? data.publishedAt).slice(0, 10)
    : iso(stat.birthtime);
  const updatedAt = (entry.updatedAt ?? data.updatedAt)
    ? String(entry.updatedAt ?? data.updatedAt).slice(0, 10)
    : iso(stat.mtime);

  return {
    order: entry.order,
    slug,
    title: entry.title ?? data.title ?? h1?.text ?? slug,
    excerpt:
      entry.excerpt ??
      data.excerpt ??
      (firstPara?.text ?? "").replace(/\s+/g, " ").slice(0, 180),
    coverImage: entry.coverImage ?? data.coverImage ?? findCover(slug, file.replace(/\.md$/, "")),
    category: entry.category ?? data.category ?? "General",
    tags: entry.tags ?? data.tags ?? [],
    author: entry.author ?? data.author ?? "Amrit Bhusal",
    publishedAt,
    updatedAt,
    html: md.parse(body, { async: false }) as string,
    headings,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(MANIFEST)) return [];
  const entries: BlogEntry[] = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

  return entries
    .filter((e) => {
      const exists = fs.existsSync(path.join(BLOG_DIR, e.file));
      // A manifest row with no markdown behind it is a typo, not a post.
      if (!exists) console.warn(`[blog] blogs.json lists a missing file: ${e.file}`);
      return exists;
    })
    .map(parse)
    .sort((a, b) => b.order - a.order);
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
