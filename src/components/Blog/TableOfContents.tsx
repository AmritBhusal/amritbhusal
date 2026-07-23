'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/blog';

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost heading currently intersecting the trigger band.
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visible[0].target.id);
        }
      },
      // Trigger band near the top of the viewport.
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  // Scroll to a heading without pushing a new history entry — so the browser
  // Back button returns to the blog list, not the previously-clicked heading.
  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
    setActiveId(id);
  };

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="fixed left-[max(1.5rem,calc((100vw-48rem)/2-16rem))] top-32 hidden w-56 xl:block"
    >
      <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-[#5c5040]">
        # on this page
      </p>
      <ul className="space-y-1 border-l border-[#3a3128]">
        {headings.map((h) => {
          const isActive = h.id === activeId;
          return (
            <li key={h.id} style={{ paddingLeft: h.level === 3 ? '1rem' : 0 }}>
              <a
                href={`#${h.id}`}
                onClick={(e) => go(e, h.id)}
                className={`-ml-px block border-l-2 py-1 pl-3 font-mono text-xs transition-colors ${
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-[#a89984] hover:text-[#ebdbb2]'
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
