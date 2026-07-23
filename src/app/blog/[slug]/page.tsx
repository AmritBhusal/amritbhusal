import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getAllPosts, getPost } from '@/lib/blog';
import TableOfContents from '@/components/Blog/TableOfContents';

const siteUrl = 'https://amritbhusal1.com.np';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags, post.category, 'Amrit Bhusal', 'Blog'],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage ? [{ url: `${siteUrl}${post.coverImage}` }] : undefined,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const all = getAllPosts(); // newest → oldest
  const idx = all.findIndex((p) => p.slug === slug);
  const post = all[idx];
  if (!post) notFound();

  const newer = all[idx - 1]; // more recent
  const older = all[idx + 1]; // less recent

  return (
    <div className="relative min-h-screen w-full">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-20 blur-[130px]"
          style={{ background: 'radial-gradient(circle, #c8791f, transparent 70%)' }}
        />
        <div className="grain absolute inset-0" />
      </div>

      <TableOfContents headings={post.headings} />

      <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1.5 font-mono text-xs text-[#a89984] transition-colors hover:text-primary"
        >
          <ArrowLeft size={14} /> cd ~/blog
        </Link>

        <p className="font-mono text-xs text-[#a89984]">
          <span className="text-term-green">$</span> cat {post.slug}.md
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#fbf1c7] md:text-4xl">{post.title}</h1>
        <p className="mt-2 font-mono text-xs text-[#a89984]">
          {post.publishedAt} · {post.author} · {post.category}
          {post.updatedAt !== post.publishedAt && (
            <span className="text-[#5c5040]"> · updated {post.updatedAt}</span>
          )}
        </p>

        {post.coverImage && (
          <div className="mt-6 overflow-hidden rounded-xl border border-[#3a3128]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverImage} alt={post.title} className="w-full object-cover" />
          </div>
        )}

        <div
          className="prose-blog mt-8"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-[#3a3128] pt-6">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#3a3128] px-2.5 py-0.5 font-mono text-[11px] text-[#a89984]"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {(newer || older) && (
          <nav className="mt-12 grid gap-4 border-t border-[#3a3128] pt-8 sm:grid-cols-2">
            {[
              { label: '← newer post', post: newer, align: '' },
              { label: 'older post →', post: older, align: 'sm:text-right sm:items-end' },
            ]
              .filter((x) => x.post)
              .map(({ label, post: p, align }) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className={`group flex flex-col gap-1 rounded-xl border border-[#3a3128] bg-[#221d17] p-4 transition-colors hover:border-primary/50 ${align}`}
                >
                  <span className="font-mono text-[11px] text-[#a89984]">{label}</span>
                  <span className="font-semibold text-[#fbf1c7] transition-colors group-hover:text-primary">
                    {p.title}
                  </span>
                </Link>
              ))}
          </nav>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#a89984] transition-colors hover:text-primary"
          >
            <ArrowLeft size={14} /> all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
