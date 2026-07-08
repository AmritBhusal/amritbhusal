'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const stats = [
  { value: 20, suffix: '+', label: 'projects shipped' },
  { value: 3, suffix: '+', label: 'years building' },
  { value: 10, suffix: '+', label: 'happy clients' },
  { value: 95, suffix: '+', label: 'lighthouse scores' },
];

function Counter({ value, suffix, run }: { value: number; suffix: string; run: boolean }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!run || reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    let start = 0;
    const dur = 1100;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value, reduce]);

  return (
    <span className="font-mono text-3xl font-bold text-primary md:text-4xl">
      {n}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="px-4 py-8">
      <div
        ref={ref}
        className="mx-auto grid max-w-4xl grid-cols-2 gap-4 rounded-xl border border-[#3a3128] bg-[#221d17] p-6 md:grid-cols-4"
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <Counter value={s.value} suffix={s.suffix} run={inView} />
            <div className="mt-1 font-mono text-xs text-[#a89984]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
