'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CornerDownRight, ExternalLink, Folder } from 'lucide-react';
import portfolioData from '@/components/Portfolio/portfolio.json';
import { Project, getLanguageColor, getLanguageName } from '@/components/Intro/types';

const sorted = [...(portfolioData as Project[])].sort((a, b) => Number(b.id) - Number(a.id));

const FILTERS = [
  { key: 'all', label: 'all' },
  { key: 'client', label: 'client' },
  { key: 'personal', label: 'personal' },
] as const;

// Project name → a plausible directory name, e.g. "Gadgetbyte Nepal" → "gadgetbyte-nepal"
const slug = (name: string) =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function ProjectsPage() {
  const [filter, setFilter] = useState<string>('all');
  const [activeId, setActiveId] = useState<string>(sorted[0]?.id);

  const list = useMemo(() => {
    if (filter === 'all') return sorted;
    return sorted.filter((p) => (filter === 'client' ? p.type === 'client' : p.type !== 'client'));
  }, [filter]);

  const active = list.find((p) => p.id === activeId) ?? list[0];

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
        {/* header */}
        <Link
          href="/#work"
          className="mb-6 inline-flex items-center gap-1.5 font-mono text-xs text-[#a89984] transition-colors hover:text-primary"
        >
          <ArrowLeft size={14} /> cd ~/
        </Link>

        <p className="font-mono text-sm text-[#a89984]">
          <span className="text-term-green">[amrit@arch ~]</span>${' '}
          <span className="text-[#fbf1c7]">ls -la ~/projects --{filter}</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#fbf1c7] md:text-4xl">Project archive</h1>
        <p className="mt-2 max-w-xl text-[#a89984]">
          Everything I&apos;ve shipped, browsed like a directory. Hover a row to preview,
          click to open the case study.
        </p>

        {/* filter chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                filter === f.key
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-[#3a3128] bg-[#221d17] text-[#a89984] hover:border-primary/50 hover:text-[#ebdbb2]'
              }`}
            >
              --{f.label}
            </button>
          ))}
        </div>

        {/* terminal file-manager */}
        <div className="mt-6 overflow-hidden rounded-xl border border-[#3a3128] bg-[#221d17] shadow-2xl shadow-black/40">
          {/* title bar */}
          <div className="flex items-center gap-2 border-b border-[#3a3128] bg-[#1b1712] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#fb4934]" />
            <span className="h-3 w-3 rounded-full bg-[#1793d1]" />
            <span className="h-3 w-3 rounded-full bg-[#b8bb26]" />
            <span className="ml-3 font-mono text-xs text-[#a89984]">amrit@arch: ~/projects — lf</span>
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
                  const isActive = p.id === active?.id;
                  return (
                    <li key={p.id}>
                      <Link
                        href={`/detail/${p.id}`}
                        onMouseEnter={() => setActiveId(p.id)}
                        onFocus={() => setActiveId(p.id)}
                        className={`flex items-center gap-3 px-4 py-2 outline-none transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-[#fbf1c7]'
                            : 'text-[#a89984] hover:bg-[#2b241b]'
                        }`}
                      >
                        <span className="hidden shrink-0 text-[#5c5040] sm:inline">drwxr-xr-x</span>
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: getLanguageColor(p) }}
                          title={getLanguageName(p)}
                        />
                        <Folder size={14} className="shrink-0 text-term-blue" />
                        <span className={`truncate ${isActive ? 'text-primary' : 'text-term-blue'}`}>
                          {slug(p.name)}/
                        </span>
                        <span className="ml-auto shrink-0 rounded-full border border-[#3a3128] px-2 py-0.5 text-[10px] text-[#a89984]">
                          {p.type === 'client' ? 'client' : 'personal'}
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
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[#3a3128] bg-[#1b1712]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={active.id}
                      src={active.image}
                      alt={active.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-[#fbf1c7]">{active.name}</h2>
                  <p className="mt-1 font-mono text-xs text-[#a89984]">
                    <span className="text-term-green">$</span> cat role.txt →{' '}
                    <span className="text-[#ebdbb2]">{active.role}</span>
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#a89984]">{active.details}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <Link
                      href={`/detail/${active.id}`}
                      className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                    >
                      <CornerDownRight size={15} /> open case study
                    </Link>
                    {active.demoUrl !== '#' && (
                      <a
                        href={active.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-term-orange hover:underline"
                      >
                        live <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
