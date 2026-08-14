'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Heading } from '@/lib/blog';

type Section = { heading: Heading; children: Heading[] };

// Group h3s under the h2 that precedes them. A leading h3 becomes its own section.
function toSections(headings: Heading[]): Section[] {
  const sections: Section[] = [];
  for (const h of headings) {
    if (h.level > 2 && sections.length) sections[sections.length - 1].children.push(h);
    else sections.push({ heading: h, children: [] });
  }
  return sections;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');
  // Per-section manual override; unset means "follow the active heading".
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const listRef = useRef<HTMLUListElement>(null);

  const sections = useMemo(() => toSections(headings), [headings]);

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

  // Keep the active entry visible when the list is long enough to scroll.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeId]);

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
      className="fixed left-[max(1.5rem,calc((100vw-48rem)/2-16rem))] top-32 hidden w-60 xl:block"
    >
      <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-[#5c5040]">
        # on this page
      </p>
      <ul
        ref={listRef}
        className="no-scrollbar max-h-[calc(100vh-14rem)] space-y-0.5 overflow-y-auto border-l border-[#3a3128] pr-1"
      >
        {sections.map(({ heading, children }) => {
          const hasActiveChild = children.some((c) => c.id === activeId);
          const open = overrides[heading.id] ?? (heading.id === activeId || hasActiveChild);
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id}>
              <div className="flex items-center">
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => go(e, heading.id)}
                  data-active={isActive}
                  className={`-ml-px block flex-1 truncate border-l-2 py-1.5 pl-3 font-mono text-xs transition-colors ${
                    isActive || hasActiveChild
                      ? 'border-primary text-primary'
                      : 'border-transparent text-[#a89984] hover:text-[#ebdbb2]'
                  }`}
                  title={heading.text}
                >
                  {heading.text}
                </a>
                {children.length > 0 && (
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-label={`${open ? 'Collapse' : 'Expand'} ${heading.text}`}
                    onClick={() => setOverrides((o) => ({ ...o, [heading.id]: !open }))}
                    className="shrink-0 rounded p-1 text-[#5c5040] transition-colors hover:text-[#ebdbb2]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </button>
                )}
              </div>

              {children.length > 0 && (
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <ul className="overflow-hidden">
                    {children.map((c) => {
                      const childActive = c.id === activeId;
                      return (
                        <li key={c.id}>
                          <a
                            href={`#${c.id}`}
                            onClick={(e) => go(e, c.id)}
                            data-active={childActive}
                            tabIndex={open ? 0 : -1}
                            className={`-ml-px block truncate border-l-2 py-1 pl-6 font-mono text-[11px] transition-colors ${
                              childActive
                                ? 'border-primary text-primary'
                                : 'border-transparent text-[#8a8070] hover:text-[#ebdbb2]'
                            }`}
                            title={c.text}
                          >
                            {c.text}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
