'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CornerDownRight, FileText } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

type PostMeta = Omit<BlogPost, 'html'>;

export default function BlogListClient({ posts }: { posts: PostMeta[] }) {
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );
  const [filter, setFilter] = useState<string>('all');
  const [activeSlug, setActiveSlug] = useState<string>(posts[0]?.slug);

  const list = useMemo(
    () => (filter === 'all' ? posts : posts.filter((p) => p.category === filter)),
    [filter, posts]
  );

  const active = list.find((p) => p.slug === activeSlug) ?? list[0];

  return (
    <div className="relative min-h-screen w-full">
      {/* ambient wash — matches home */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full opacity-20 blur-[130px]"
          style={{ background: 'radial-gradient(circle, #c8791f, transparent 70%)' }}
        />
        <div
          className="absolute -right-40 bottom-10 h-[36rem] w-[36rem] rounded-full opacity-[0.15] blur-[130px]"
          style={{ background: 'radial-gradient(circle, #1793d1, transparent 70%)' }}
        />
        <div className="grain absolute inset-0" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 font-mono text-xs text-[#a89984] transition-colors hover:text-primary"
        >
          <ArrowLeft size={14} /> cd ~/
        </Link>

        <p className="font-mono text-sm text-[#a89984]">
          <span className="text-term-green">[amrit@arch ~]</span>${' '}
          <span className="text-[#fbf1c7]">ls -la ~/blog --{filter}</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#fbf1c7] md:text-4xl">Blog</h1>
        <p className="mt-2 max-w-xl text-[#a89984]">
          Notes on frontend, TypeScript and shipping things. Hover a row to preview,
          click to read.
        </p>

        {/* filter chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                filter === c
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-[#3a3128] bg-[#221d17] text-[#a89984] hover:border-primary/50 hover:text-[#ebdbb2]'
              }`}
            >
              --{c}
            </button>
          ))}
        </div>

        {/* terminal file-manager */}
        <div className="mt-6 overflow-hidden rounded-xl border border-[#3a3128] bg-[#221d17] shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2 border-b border-[#3a3128] bg-[#1b1712] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#fb4934]" />
            <span className="h-3 w-3 rounded-full bg-[#1793d1]" />
            <span className="h-3 w-3 rounded-full bg-[#b8bb26]" />
            <span className="ml-3 font-mono text-xs text-[#a89984]">amrit@arch: ~/blog — lf</span>
            <span className="ml-auto font-mono text-[10px] text-[#a89984]">{list.length} items</span>
          </div>

          <div className="grid lg:grid-cols-[1.35fr_1fr]">
            {/* file list */}
            <div className="min-w-0 font-mono text-[13px] lg:border-r lg:border-[#3a3128]">
              <div className="border-b border-[#3a3128] px-4 py-2 text-[11px] text-[#5c5040]">
                total {list.length}
              </div>
              <ul className="max-h-[70vh] overflow-y-auto py-1">
                {list.map((p) => {
                  const isActive = p.slug === active?.slug;
                  return (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        onMouseEnter={() => setActiveSlug(p.slug)}
                        onFocus={() => setActiveSlug(p.slug)}
                        className={`flex items-center gap-3 px-4 py-2 outline-none transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-[#fbf1c7]'
                            : 'text-[#a89984] hover:bg-[#2b241b]'
                        }`}
                      >
                        <span className="hidden shrink-0 text-[#5c5040] sm:inline">-rw-r--r--</span>
                        <FileText size={14} className="shrink-0 text-term-blue" />
                        <span className={`truncate ${isActive ? 'text-primary' : 'text-term-blue'}`}>
                          {p.slug}.md
                        </span>
                        <span className="ml-auto shrink-0 rounded-full border border-[#3a3128] px-2 py-0.5 text-[10px] text-[#a89984]">
                          {p.category}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* preview pane */}
            <div className="hidden min-w-0 flex-col p-4 lg:flex">
              {active && (
                <>
                  {active.coverImage && (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[#3a3128] bg-[#1b1712]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        key={active.slug}
                        src={active.coverImage}
                        alt={active.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <h2 className="mt-4 text-lg font-bold text-[#fbf1c7]">{active.title}</h2>
                  <p className="mt-1 font-mono text-xs text-[#a89984]">
                    <span className="text-term-green">$</span> stat →{' '}
                    <span className="text-[#ebdbb2]">{active.publishedAt}</span> · {active.author}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#a89984]">{active.excerpt}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {active.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[#3a3128] px-2 py-0.5 font-mono text-[10px] text-[#a89984]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${active.slug}`}
                    className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    <CornerDownRight size={15} /> read post
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
