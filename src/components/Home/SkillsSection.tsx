'use client';

import React from 'react';
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiCss3,
  SiTailwindcss, SiSass, SiMui, SiBootstrap, SiFramer,
  SiRedux, SiGraphql, SiVite, SiJest, SiStorybook, SiGit, SiFigma,
} from 'react-icons/si';
import {
  Component, Package, Database, Server, ShieldCheck, FlaskConical,
  Gauge, Zap, Accessibility, Search,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { IconType } from 'react-icons';

type Skill = { name: string; Icon: IconType | LucideIcon; color: string };
type Group = { title: string; skills: Skill[] };

const BLUE = 'hsl(var(--term-blue))';

const groups: Group[] = [
  {
    title: 'core',
    skills: [
      { name: 'React', Icon: SiReact, color: '#61dafb' },
      { name: 'Next.js', Icon: SiNextdotjs, color: '#ebdbb2' },
      { name: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#f7df1e' },
      { name: 'HTML5', Icon: SiHtml5, color: '#e34f26' },
      { name: 'CSS3', Icon: SiCss3, color: '#1572b6' },
    ],
  },
  {
    title: 'styling & ui',
    skills: [
      { name: 'Tailwind', Icon: SiTailwindcss, color: '#38bdf8' },
      { name: 'Sass', Icon: SiSass, color: '#cc6699' },
      { name: 'Material UI', Icon: SiMui, color: '#007fff' },
      { name: 'Bootstrap', Icon: SiBootstrap, color: '#7952b3' },
      { name: 'Framer Motion', Icon: SiFramer, color: BLUE },
      { name: 'Radix / shadcn', Icon: Component, color: BLUE },
    ],
  },
  {
    title: 'state & data',
    skills: [
      { name: 'Redux', Icon: SiRedux, color: '#764abc' },
      { name: 'Zustand', Icon: Package, color: BLUE },
      { name: 'React Query', Icon: Database, color: BLUE },
      { name: 'GraphQL', Icon: SiGraphql, color: '#e10098' },
      { name: 'REST APIs', Icon: Server, color: BLUE },
      { name: 'Zod', Icon: ShieldCheck, color: BLUE },
    ],
  },
  {
    title: 'tooling & testing',
    skills: [
      { name: 'Vite', Icon: SiVite, color: '#646cff' },
      { name: 'Jest', Icon: SiJest, color: '#c21325' },
      { name: 'Testing Library', Icon: FlaskConical, color: BLUE },
      { name: 'Storybook', Icon: SiStorybook, color: '#ff4785' },
      { name: 'Git', Icon: SiGit, color: '#f05032' },
      { name: 'Figma', Icon: SiFigma, color: '#a259ff' },
    ],
  },
  {
    title: 'performance & quality',
    skills: [
      { name: 'Lighthouse', Icon: Gauge, color: BLUE },
      { name: 'Core Web Vitals', Icon: Zap, color: BLUE },
      { name: 'Accessibility', Icon: Accessibility, color: BLUE },
      { name: 'SEO', Icon: Search, color: BLUE },
      { name: 'SSR / SSG', Icon: Server, color: BLUE },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 font-mono text-sm text-[#a89984]">
          <span className="text-term-green">[amrit@arch ~]</span>${' '}
          <span className="text-[#fbf1c7]">cat skills.json</span>
        </p>
        <h2 className="mb-8 text-3xl font-bold text-[#fbf1c7] md:text-4xl">The toolbox</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <div
              key={g.title}
              className="rounded-xl border border-[#3a3128] bg-[#221d17] p-5"
            >
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-primary">
                {g.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s) => {
                  const Icon = s.Icon as React.ComponentType<{
                    size?: number;
                    className?: string;
                    style?: React.CSSProperties;
                  }>;
                  return (
                    <span
                      key={s.name}
                      className="group flex items-center gap-1.5 rounded-md border border-[#3a3128] bg-[#2b241b] px-2.5 py-1.5 font-mono text-xs text-[#ebdbb2] transition-all hover:-translate-y-0.5 hover:border-primary"
                    >
                      <Icon
                        size={15}
                        className="text-[#a89984] transition-colors group-hover:[color:var(--i)]"
                        // per-icon brand color revealed on hover
                        style={{ ['--i' as string]: s.color } as React.CSSProperties}
                      />
                      {s.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
