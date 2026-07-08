'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { BsGithub } from 'react-icons/bs';
import { ArrowLeft, ArrowRight, ArrowUpRight, SquareArrowOutUpRight } from 'lucide-react';
import portfolioData from './portfolio.json';
import { Project, getLanguageColor, getLanguageName } from '@/components/Intro/types';
import { Squiggle, Arrow } from '@/components/Home/Doodle';

type Impact = { challenge: string; solution: string; results: string[] };

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/* ---- the Arch prompt, same voice as home ---- */
const Prompt = ({ path }: { path: string }) => (
  <span className="select-none whitespace-pre">
    <span className="text-[#a89984]">[</span>
    <span className="text-term-blue">amrit@arch</span>
    <span className="text-term-green"> {path}</span>
    <span className="text-[#a89984]">]$ </span>
  </span>
);

/* ---- scroll reveal ---- */
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

/* ---- section marker: prompt line + heading ---- */
const SectionHead = ({ cmd, title, note }: { cmd: string; title: string; note?: string }) => (
  <div className="mb-6">
    <p className="truncate font-mono text-sm text-[#a89984]">
      <span className="text-term-green">$</span> <span className="text-[#fbf1c7]">{cmd}</span>
    </p>
    <h2 className="mt-2 text-2xl font-bold text-[#fbf1c7] sm:text-3xl">{title}</h2>
    {note && <p className="mt-1.5 max-w-xl text-sm text-[#a89984]">{note}</p>}
  </div>
);

/* ---- project-scoped interactive terminal ---- */
function ProjectTerminal({ project, slug }: { project: Project; slug: string }) {
  const router = useRouter();
  const impact = (project as Project & { impact?: Impact }).impact;
  const idRef = useRef(0);
  const nextId = () => ++idRef.current;
  const path = `~/work/${slug}`;

  const [lines, setLines] = useState<{ id: number; node: React.ReactNode }[]>(() => [
    {
      id: 1,
      node: (
        <div className="text-[#a89984]">
          Shell scoped to <span className="text-term-aqua">{project.name}</span>. Type{' '}
          <span className="text-term-blue">help</span> to dig in.
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const push = (node: React.ReactNode) => setLines((ls) => [...ls, { id: nextId(), node }]);

  const list = (items: string[], color = 'text-term-green') => (
    <div className="space-y-0.5">
      {items.map((t, i) => (
        <div key={i} className="flex gap-2 text-[#a89984]">
          <span className={`${color} whitespace-nowrap`}>-&gt;</span>
          <span>{t}</span>
        </div>
      ))}
    </div>
  );

  const files = [
    'readme.md',
    ...(impact ? ['impact.log'] : []),
    'stack.txt',
    'features.txt',
    'challenges.md',
  ];

  const commands: Record<string, (args: string[]) => { print?: React.ReactNode; clear?: boolean; effect?: () => void }> = {
    help: () => ({
      print: (
        <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 sm:grid-cols-3">
          {[
            ['help', 'this list'],
            ['ls', 'project files'],
            ['cat <file>', 'read a file'],
            ['readme', 'the story'],
            ...(impact ? [['impact', 'did it work?']] : []),
            ['stack', 'how it’s built'],
            ['features', 'what it does'],
            ['open', 'launch live site'],
            ['code', 'view source'],
            ['cd ..', 'back to all work'],
            ['clear', 'wipe screen'],
          ].map(([c, d]) => (
            <div key={c}>
              <span className="text-term-blue">{c}</span>
              <span className="text-[#5c5040]"> — </span>
              <span className="text-[#a89984]">{d}</span>
            </div>
          ))}
        </div>
      ),
    }),
    ls: () => ({
      print: (
        <div className="flex flex-wrap gap-x-5 gap-y-0.5 font-mono">
          {files.map((f) => (
            <span key={f} className="text-term-green">{f}</span>
          ))}
        </div>
      ),
    }),
    cat: (a) => {
      const f = (a[0] || '').toLowerCase();
      if (f.startsWith('readme')) return commands.readme([]);
      if (f.startsWith('impact') && impact) return commands.impact([]);
      if (f.startsWith('stack')) return commands.stack([]);
      if (f.startsWith('features')) return commands.features([]);
      if (f.startsWith('challenges')) return commands.challenges([]);
      return {
        print: <span className="text-term-red">cat: {a[0] || ''}: No such file. try <span className="text-term-blue">ls</span></span>,
      };
    },
    readme: () => ({
      print: (
        <div className="max-w-xl space-y-1.5 text-[#a89984]">
          <p className="text-[#ebdbb2]">{project.details}</p>
          <p>{project.description}</p>
        </div>
      ),
    }),
    ...(impact
      ? {
          impact: () => ({
            print: (
              <div className="max-w-xl space-y-1.5">
                <p><span className="text-term-orange"># challenge</span> <span className="text-[#a89984]">{impact.challenge}</span></p>
                <p><span className="text-term-blue"># solution</span> <span className="text-[#a89984]">{impact.solution}</span></p>
                <div>
                  {impact.results.map((r, i) => (
                    <div key={i} className="flex gap-2 text-[#a89984]">
                      <span className="text-term-green">✓</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            ),
          }),
        }
      : {}),
    stack: () => ({ print: list(project.technicalDetails) }),
    tech: (a) => commands.stack(a),
    features: () => ({ print: list(project.keyFeatures, 'text-term-blue') }),
    challenges: () => ({ print: list(project.challenges, 'text-term-orange') }),
    open: () =>
      project.demoUrl !== '#'
        ? {
            effect: () => window.open(project.demoUrl, '_blank'),
            print: <span className="text-term-green">↗ opening {project.demoUrl}…</span>,
          }
        : { print: <span className="text-term-red">no public demo — NDA client work. sorry!</span> },
    demo: (a) => commands.open(a),
    code: () =>
      project.codeUrl !== '#'
        ? {
            effect: () => window.open(project.codeUrl, '_blank'),
            print: <span className="text-term-green">↗ opening source on GitHub…</span>,
          }
        : { print: <span className="text-term-red">source is private — client owns this one.</span> },
    cd: (a) => {
      const target = a[0] || '~';
      if (target === '..' || target === '~' || target === '/') {
        return {
          effect: () => router.push('/#work'),
          print: <span className="text-[#a89984]">heading back to ~/work…</span>,
        };
      }
      return { print: <span className="text-term-red">cd: {target}: No such directory</span> };
    },
    pwd: () => ({ print: <span className="text-[#ebdbb2]">/home/amrit/work/{slug}</span> }),
    whoami: () => ({
      print: (
        <span className="text-[#a89984]">
          you&apos;re a visitor with excellent taste. I&apos;m{' '}
          <span className="text-[#ebdbb2]">Amrit</span> — I built this one as {project.role}.
        </span>
      ),
    }),
    echo: (a) => ({ print: <span className="text-[#ebdbb2]">{a.join(' ')}</span> }),
    sudo: () => ({
      print: <span className="text-term-red">amrit is not in the sudoers file. This incident will be reported. 🙂</span>,
    }),
    pacman: (a) => ({
      print: (
        <span className="text-term-green">
          {a[0] === '-S' ? `installing ${a[1] || 'good-taste'}… done. 😎` : 'usage: pacman -S <package>'}
        </span>
      ),
    }),
    clear: () => ({ clear: true }),
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    push(
      <div className="break-words">
        <Prompt path={path} />
        <span className="text-[#fbf1c7]">{raw}</span>
      </div>
    );
    if (trimmed) setHistory((h) => [...h, trimmed]);
    setHistIdx(-1);
    if (!trimmed) return;

    const [name, ...args] = trimmed.split(/\s+/);
    const cmd = commands[name.toLowerCase()];
    if (!cmd) {
      push(
        <span className="text-term-red">
          command not found: {name}. try <span className="text-term-blue">help</span>.
        </span>
      );
      return;
    }
    const res = cmd(args);
    if (res.clear) return setLines([]);
    if (res.print !== undefined) push(res.print);
    res.effect?.();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="cursor-text overflow-hidden rounded-xl border border-[#3a3128] bg-[#221d17] shadow-2xl shadow-black/40"
    >
      <div className="flex items-center gap-2 border-b border-[#3a3128] bg-[#1b1712] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#fb4934]" />
        <span className="h-3 w-3 rounded-full bg-[#1793d1]" />
        <span className="h-3 w-3 rounded-full bg-[#b8bb26]" />
        <span className="ml-3 min-w-0 truncate font-mono text-xs text-[#a89984]">
          amrit@arch: {path} — bash
        </span>
        <span className="ml-auto hidden items-center gap-1.5 font-mono text-[10px] text-term-green sm:flex">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'hsl(var(--term-green))' }} /> scoped shell
        </span>
      </div>
      <div
        ref={scrollRef}
        className="scanlines no-scrollbar h-64 space-y-1.5 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed sm:h-72 sm:px-5 sm:text-sm"
      >
        {lines.map((l) => (
          <div key={l.id}>{l.node}</div>
        ))}
        <div className="flex items-center">
          <Prompt path={path} />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Project terminal — type a command"
            placeholder="try 'impact'"
            style={{ caretColor: 'hsl(var(--primary))' }}
            className="min-w-0 flex-1 bg-transparent text-[#fbf1c7] outline-none placeholder:text-[#5c5040]"
          />
        </div>
      </div>
    </div>
  );
}

const sorted = [...(portfolioData as Project[])].sort((a, b) => Number(b.id) - Number(a.id));

const ProjectDetail: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  const idx = sorted.findIndex((p) => p.id === id);
  const project = idx === -1 ? undefined : sorted[idx];

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center font-mono">
          <p className="mb-2 text-term-red">bash: cd: ./work/{id}: No such file or directory</p>
          <Link href="/" className="text-term-blue hover:underline">← cd ~/</Link>
        </div>
      </div>
    );
  }

  const impact = (project as Project & { impact?: Impact }).impact;
  const slug = slugify(project.name);
  const prev = sorted[idx + 1];
  const next = sorted[idx - 1];

  return (
    <div className="relative min-h-screen overflow-x-clip py-8">
      {/* warm + cool ambient wash + grain, same as home */}
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

      <div className="mx-auto max-w-4xl px-4 md:px-6">
        {/* breadcrumb */}
        <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm">
          <Link href="/#work" className="flex flex-shrink-0 items-center gap-1.5 text-term-blue hover:underline">
            <ArrowLeft size={14} />
            cd ~/work
          </Link>
          <p className="min-w-0 truncate text-[#a89984]">
            <Prompt path="~" />
            <span className="text-[#fbf1c7]">./work/{slug}</span>
          </p>
        </div>

        {/* hero */}
        <Reveal>
          <div className="mb-10">
            <p className="mb-3 font-mono text-sm text-[#a89984]">
              // case study <span className="text-term-orange">№{project.id}</span> —{' '}
              {project.type === 'client' ? 'client work' : 'personal build'}
            </p>
            <h1 className="text-4xl font-bold leading-[1.05] text-[#fbf1c7] sm:text-5xl">
              <span className="relative inline">
                {project.name}
                <Squiggle className="absolute -bottom-3 left-0 h-3 w-full text-primary/70" />
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[#a89984]">{project.details}</p>

            {/* quick facts, one honest line */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-[#a89984]">
              <span>
                role<span className="text-[#5c5040]">:</span>{' '}
                <span className="text-[#ebdbb2]">{project.role}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: getLanguageColor(project) }} />
                {getLanguageName(project)}
              </span>
              <span>
                access<span className="text-[#5c5040]">:</span>{' '}
                <span className="text-[#ebdbb2]">{project.type === 'client' ? 'private' : 'public'}</span>
              </span>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {project.demoUrl !== '#' && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  <SquareArrowOutUpRight size={16} />
                  See it live
                </a>
              )}
              {project.codeUrl !== '#' && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#3a3128] bg-[#221d17] px-5 py-2.5 font-semibold text-[#ebdbb2] transition-colors hover:border-primary"
                >
                  <BsGithub size={16} />
                  Read the code
                </a>
              )}
              {project.demoUrl === '#' && project.codeUrl === '#' && (
                <span className="font-mono text-xs text-[#5c5040]"># links are private — NDA. happy to demo it on a call.</span>
              )}
            </div>
          </div>
        </Reveal>

        {/* interactive terminal */}
        <Reveal delay={0.1}>
          <div className="relative mb-16">
            <ProjectTerminal project={project} slug={slug} />
            <div className="pointer-events-none absolute -right-3 -bottom-12 hidden items-center gap-1 text-primary/70 lg:flex">
              <Arrow className="h-10 w-14 rotate-[190deg]" />
              <span className="font-mono text-xs">the shell knows this project</span>
            </div>
          </div>
        </Reveal>

        {/* the story */}
        <Reveal>
          <section className="mb-16">
            <SectionHead cmd="cat readme.md" title="What this is" />
            <div className="max-w-2xl space-y-4 leading-relaxed text-[#a89984]">
              <p className="text-[#ebdbb2]">{project.description}</p>
            </div>
          </section>
        </Reveal>

        {/* impact */}
        {impact && (
          <Reveal>
            <section className="mb-16">
              <SectionHead cmd="tail impact.log" title="Did it actually work?" note="The part clients care about." />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#3a3128] bg-[#221d17] p-5">
                  <p className="mb-2 font-mono text-xs uppercase tracking-wider text-term-orange"># the problem</p>
                  <p className="text-sm leading-relaxed text-[#ebdbb2]">{impact.challenge}</p>
                </div>
                <div className="rounded-xl border border-[#3a3128] bg-[#221d17] p-5">
                  <p className="mb-2 font-mono text-xs uppercase tracking-wider text-term-blue"># what I did</p>
                  <p className="text-sm leading-relaxed text-[#ebdbb2]">{impact.solution}</p>
                </div>
              </div>
              <div className="mt-4 rounded-xl border border-[#3a3128] bg-[#221d17] p-5">
                <p className="mb-3 font-mono text-xs uppercase tracking-wider text-term-green"># the receipts</p>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {impact.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm text-[#ebdbb2]">
                      <span className="mt-0.5 font-mono text-term-green">✓</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Reveal>
        )}

        {/* how it's built */}
        <Reveal>
          <section className="mb-16">
            <SectionHead cmd="cat stack.txt" title="How it's built" />
            <ol className="max-w-2xl space-y-0">
              {project.technicalDetails.map((detail, index) => (
                <li
                  key={index}
                  className="group flex items-start gap-4 border-l border-[#3a3128] py-2.5 pl-5 transition-colors hover:border-primary"
                >
                  <span className="mt-0.5 font-mono text-xs text-[#5c5040] transition-colors group-hover:text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[#ebdbb2]">{detail}</span>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        {/* features + challenges */}
        <Reveal>
          <section className="mb-16 grid gap-10 md:grid-cols-2 md:gap-8">
            <div>
              <SectionHead cmd="cat features.txt" title="What it does" />
              <ul className="space-y-2.5">
                {project.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm text-[#ebdbb2]">
                    <span className="mt-0.5 whitespace-nowrap font-mono text-xs text-term-blue">-&gt;</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHead cmd="cat challenges.md" title="The hard parts" note="Every project has them. These were mine." />
              <ul className="space-y-2.5">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm text-[#ebdbb2]">
                    <span className="mt-0.5 whitespace-nowrap font-mono text-xs text-term-orange">-&gt;</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* prev / next */}
        <Reveal>
          <nav className="mb-12 grid gap-4 border-t border-[#3a3128] pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/detail/${prev.id}`}
                className="group rounded-xl border border-[#3a3128] bg-[#221d17] p-4 transition-colors hover:border-primary/60"
              >
                <p className="mb-1 flex items-center gap-1.5 font-mono text-xs text-[#a89984]">
                  <ArrowLeft size={12} /> cd ../{slugify(prev.name)}
                </p>
                <p className="font-semibold text-[#fbf1c7] transition-colors group-hover:text-primary">{prev.name}</p>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <Link
                href={`/detail/${next.id}`}
                className="group rounded-xl border border-[#3a3128] bg-[#221d17] p-4 text-right transition-colors hover:border-primary/60"
              >
                <p className="mb-1 flex items-center justify-end gap-1.5 font-mono text-xs text-[#a89984]">
                  cd ../{slugify(next.name)} <ArrowRight size={12} />
                </p>
                <p className="font-semibold text-[#fbf1c7] transition-colors group-hover:text-primary">{next.name}</p>
              </Link>
            )}
          </nav>
        </Reveal>

        {/* outro */}
        <Reveal>
          <div className="mb-8 text-center">
            <p className="font-mono text-sm text-[#a89984]">
              // want something like this?{' '}
              <Link href="/#contact" className="inline-flex items-center gap-1 text-term-blue hover:underline">
                let&apos;s talk <ArrowUpRight size={14} />
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default ProjectDetail;
