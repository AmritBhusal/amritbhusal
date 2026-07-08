'use client';

import React from 'react';
import { MapPin, Circle } from 'lucide-react';
import about from '@/components/About/about.json';
import intro from '@/components/Intro/intro.json';
import { Arrow } from './Doodle';

const STACK = ['React', 'Next.js', 'TypeScript', 'GraphQL', 'Redux', 'Tailwind', 'Node', 'Figma → Code'];

export default function AboutSection() {
  return (
    <section id="about" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <p className="mb-6 font-mono text-sm text-[#a89984]">
          <span className="text-term-green">[amrit@arch ~]</span>${' '}
          <span className="text-[#fbf1c7]">cat about.md</span>
        </p>

        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          {/* cream "paper" note */}
          <div className="relative rounded-xl bg-[#ebdbb2] p-6 text-[#3c3228] shadow-xl md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-[#282420] md:text-3xl"># About me</h2>
            <p className="leading-relaxed">{about.description}</p>
            <p className="mt-4 leading-relaxed">
              I care about the details most people skim past — the loading state nobody thought
              about, the layout that doesn&apos;t jump, the 200ms that makes a click feel instant.
              If a UI is tricky, that&apos;s usually the part I enjoy most.
            </p>
            <p className="mt-4 font-mono text-sm text-[#5c5040]">
              {intro.trustLine}
            </p>
          </div>

          {/* meta card */}
          <div className="flex flex-col gap-4 rounded-xl border border-[#3a3128] bg-[#221d17] p-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#a89984]">status</p>
              <p className="mt-1 flex items-center gap-2 font-semibold text-term-green">
                <Circle size={9} className="fill-current" /> {about.details.freelance} for work
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#a89984]">based in</p>
              <p className="mt-1 flex items-center gap-2 font-semibold text-[#ebdbb2]">
                <MapPin size={15} className="text-primary" /> {about.details.city}
              </p>
            </div>
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[#a89984]">stack</p>
              <div className="flex flex-wrap gap-2">
                {STACK.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-[#3a3128] bg-[#2b241b] px-2 py-1 font-mono text-xs text-[#ebdbb2]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative mt-auto">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
              >
                → hire this one
              </a>
              <Arrow className="pointer-events-none absolute -right-1 -top-8 h-8 w-12 text-primary/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
