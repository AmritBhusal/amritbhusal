import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Marked } from "marked";

// Server-only: reads content/blog/*.md at build time (static export).
// Frontmatter is optional — anything missing is derived from the content
// (title = first H1, excerpt = first paragraph) or the file's timestamps.

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const COVER_DIR = path.join(process.cwd(), "public", "blog");

// Convention: a post's cover is public/blog/<slug>.<ext> unless frontmatter says otherwise.
function findCover(slug: string): string {
  for (const ext of ["png", "jpg", "jpeg", "webp", "gif", "avif"]) {
    if (fs.existsSync(path.join(COVER_DIR, `${slug}.${ext}`))) return `/blog/${slug}.${ext}`;
  }
  return "";
}

export interface Heading {
  id: string;
  text: string;
  level: number; // 2 or 3
}

export interface BlogPost {
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

function parse(file: string): BlogPost {
  const slug = file.replace(/\.md$/, "");
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
  const publishedAt = data.publishedAt
    ? String(data.publishedAt).slice(0, 10)
    : iso(stat.birthtime);
  const updatedAt = data.updatedAt ? String(data.updatedAt).slice(0, 10) : iso(stat.mtime);

  return {
    slug,
    title: data.title ?? h1?.text ?? slug,
    excerpt: data.excerpt ?? (firstPara?.text ?? "").replace(/\s+/g, " ").slice(0, 180),
    coverImage: data.coverImage ?? findCover(slug),
    category: data.category ?? "General",
    tags: data.tags ?? [],
    author: data.author ?? "Amrit Bhusal",
    publishedAt,
    updatedAt,
    html: md.parse(body, { async: false }) as string,
    headings,
  };
}

// Most recently touched first: updated time, falling back to created time.
const effectiveDate = (p: BlogPost) => p.updatedAt || p.publishedAt;

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .sort((a, b) => effectiveDate(b).localeCompare(effectiveDate(a)));
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
