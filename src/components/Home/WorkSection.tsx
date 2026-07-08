'use client';

import React, { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import portfolioData from '@/components/Portfolio/portfolio.json';
import { Project, getLanguageColor, getLanguageName } from '@/components/Intro/types';
import { featuredProjects } from './featured';
import { CircleScribble } from './Doodle';

const sorted = [...(portfolioData as Project[])].sort((a, b) => Number(b.id) - Number(a.id));

const FILTERS = [
  { key: 'all', label: 'all' },
  { key: 'client', label: 'client' },
  { key: 'personal', label: 'personal' },
] as const;

function ProjectCard({ p, reduce }: { p: Project; reduce: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10); // rotateY
    rx.set(-py * 10); // rotateX
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[#3a3128] bg-[#221d17] transition-colors hover:border-primary/60 hover:shadow-xl hover:shadow-black/40"
    >
      <Link href={`/detail/${p.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#1b1712]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute right-2 top-2 rounded-full border border-[#3a3128] bg-[#1b1712]/80 px-2 py-0.5 font-mono text-[10px] text-[#a89984] backdrop-blur">
            {p.type === 'client' ? 'client' : 'personal'}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <Link
            href={`/detail/${p.id}`}
            className="font-semibold text-[#fbf1c7] transition-colors hover:text-primary"
          >
            {p.name}
          </Link>
          <Link
            href={`/detail/${p.id}`}
            aria-label={`View ${p.name}`}
            className="text-[#a89984] transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <p className="mb-3 line-clamp-2 flex-1 text-sm text-[#a89984]">{p.details}</p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-mono text-xs text-[#a89984]">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: getLanguageColor(p) }}
            />
            {getLanguageName(p)}
          </span>
          {p.demoUrl !== '#' && (
            <a
              href={p.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-xs text-term-orange hover:underline"
            >
              live <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<string>('all');

  const shown = useMemo(() => {
    if (filter === 'all') return featuredProjects;
    return sorted
      .filter((p) => (filter === 'client' ? p.type === 'client' : p.type !== 'client'))
      .slice(0, 6);
  }, [filter]);

  return (
    <section id="work" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        {/* terminal-style header */}
        <div className="mb-8">
          <p className="font-mono text-sm text-[#a89984]">
            <span className="text-term-green">[amrit@arch ~]</span>${' '}
            <span className="text-[#fbf1c7]">ls ./work --{filter}</span>
          </p>
          <div className="relative mt-3 inline-block">
            <h2 className="text-3xl font-bold text-[#fbf1c7] md:text-4xl">Stuff I&apos;ve shipped</h2>
            <CircleScribble className="absolute -inset-x-4 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+2rem)] text-primary/40" />
          </div>
          <p className="mt-3 max-w-xl text-[#a89984]">
            A few favorites. Some are client work under NDA, so a couple of links stay private —
            happy to walk you through them on a call.
          </p>
        </div>

        {/* filter chips */}
        <div className="mb-8 flex flex-wrap gap-2">
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <ProjectCard key={p.id} p={p} reduce={reduce} />
          ))}
        </div>

        {/* browse the full archive */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-lg border border-[#3a3128] bg-[#221d17] px-5 py-3 font-mono text-sm text-[#ebdbb2] transition-colors hover:border-primary hover:text-primary"
          >
            <span className="text-term-green">$</span> ls ~/projects
            <span className="text-[#a89984] group-hover:text-primary">
              — {sorted.length} total
            </span>
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
