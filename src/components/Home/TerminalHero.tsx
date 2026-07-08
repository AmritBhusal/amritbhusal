'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Command } from 'lucide-react';
import intro from '@/components/Intro/intro.json';
import about from '@/components/About/about.json';
import { featuredProjects as featured } from './featured';
import { Squiggle, Arrow } from './Doodle';
const SKILLS = [
  'react', 'next.js', 'typescript', 'javascript', 'tailwind', 'graphql',
  'redux', 'react-query', 'framer-motion', 'node', 'jest', 'accessibility',
  'performance', 'seo',
];

const EMAIL = 'bhusalamrit41@gmail.com';

const HERO_TAGLINE = "// hey, I'm glad you're here";

/* Types out text char-by-char; shows it instantly if the user prefers reduced motion. */
function useTypewriter(text: string, speed = 45) {
  const [typed, setTyped] = useState('');
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setTyped(text);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return typed;
}

/* ---- the Arch prompt ---- */
const Prompt = () => (
  <span className="select-none whitespace-pre">
    <span className="text-[#a89984]">[</span>
    <span className="text-term-blue">amrit@arch</span>
    <span className="text-term-green"> ~</span>
    <span className="text-[#a89984]">]$ </span>
  </span>
);

const ArchLogo = () => (
  <pre className="text-term-blue leading-[1.1]" aria-hidden="true">{`      /\\
     /  \\
    /\\   \\
   /  __  \\
  /  (  )  \\
 / __|  |__ \\
/.\`        \`.\\`}</pre>
);

type CmdResult = { print?: React.ReactNode; clear?: boolean; effect?: () => void };

export default function TerminalHero() {
  const idRef = useRef(0);
  const nextId = () => ++idRef.current;

  const welcome: React.ReactNode = (
    <div className="text-[#a89984]">
      <span className="text-[#ebdbb2]">Welcome.</span> This is a real shell — poke around.{' '}
      Type <span className="text-term-blue">help</span> and hit{' '}
      <span className="text-[#ebdbb2]">Enter</span>.
    </div>
  );

  const [lines, setLines] = useState<{ id: number; node: React.ReactNode }[]>([
    { id: nextId(), node: welcome },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tagline = useTypewriter(HERO_TAGLINE);

  // keep scrolled to newest line
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const push = (node: React.ReactNode) => setLines((ls) => [...ls, { id: nextId(), node }]);

  const commands: Record<string, (args: string[]) => CmdResult> = {
    help: () => ({
      print: (
        <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 sm:grid-cols-3">
          {[
            ['help', 'this list'],
            ['whoami', 'who am I'],
            ['about', 'the short story'],
            ['skills', 'what I work with'],
            ['projects', 'featured work'],
            ['contact', 'reach me'],
            ['resume', 'download CV'],
            ['socials', 'find me online'],
            ['neofetch', 'system info :)'],
            ['date', 'my local time'],
            ['echo <txt>', 'repeat text'],
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
    whoami: () => ({
      print: (
        <span>
          <span className="text-[#ebdbb2]">Amrit Bhusal</span>
          <span className="text-[#a89984]"> — Frontend Engineer, Lalitpur 🇳🇵. </span>
          <span className="text-term-aqua">I build fast web apps that turn visitors into customers.</span>
        </span>
      ),
    }),
    about: () => ({
      print: (
        <div className="max-w-xl space-y-1 text-[#a89984]">
          <p>{about.description}</p>
          <p>I care about the 200ms that makes a click feel instant. Tricky UI is my favorite kind.</p>
        </div>
      ),
    }),
    skills: () => ({
      print: (
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {SKILLS.map((s) => (
            <span key={s} className="text-term-green">{s}</span>
          ))}
        </div>
      ),
    }),
    ls: (a) => commands.projects(a),
    projects: () => ({
      print: (
        <div className="space-y-0.5">
          {featured.map((p, i) => (
            <div key={p.id}>
              <span className="text-[#5c5040]">{String(i + 1).padStart(2, '0')} </span>
              <Link href={`/detail/${p.id}`} className="text-term-blue hover:underline">
                {p.name}
              </Link>
              <span className="text-[#a89984]"> — {p.details.slice(0, 46)}…</span>
            </div>
          ))}
          <div className="pt-1 text-[#5c5040]"># click a name to open the case study</div>
        </div>
      ),
    }),
    contact: () => ({
      effect: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
      print: (
        <span className="text-[#a89984]">
          Opening contact… or email{' '}
          <a href={`mailto:${EMAIL}`} className="text-term-blue hover:underline">{EMAIL}</a>
        </span>
      ),
    }),
    resume: () => ({
      effect: () => window.open(intro.resume, '_blank'),
      print: <span className="text-term-green">↓ downloading résumé…</span>,
    }),
    socials: () => ({
      print: (
        <div className="flex flex-col gap-0.5">
          <a href={intro.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:underline">→ github.com/AmritBhusal</a>
          <a href={intro.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:underline">→ linkedin.com/in/amrit-bhusal1</a>
          <a href={intro.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-term-blue hover:underline">→ whatsapp</a>
        </div>
      ),
    }),
    neofetch: () => ({
      print: (
        <div className="flex gap-5">
          <ArchLogo />
          <div className="space-y-0.5 text-[#a89984]">
            <div><span className="text-term-blue">amrit</span>@<span className="text-term-blue">arch</span></div>
            <div className="text-[#5c5040]">-----------</div>
            <div><span className="text-term-blue">OS</span>: Arch Linux (btw)</div>
            <div><span className="text-term-blue">Host</span>: amrit.dev</div>
            <div><span className="text-term-blue">Role</span>: Frontend Engineer</div>
            <div><span className="text-term-blue">Uptime</span>: 3+ years shipping</div>
            <div><span className="text-term-blue">Projects</span>: 20+ delivered</div>
            <div><span className="text-term-blue">Editor</span>: VS Code · Neovim</div>
            <div><span className="text-term-blue">Stack</span>: React · Next.js · TS</div>
          </div>
        </div>
      ),
    }),
    date: () => ({
      print: (
        <span className="text-[#a89984]">
          {new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu', dateStyle: 'full', timeStyle: 'short' })}{' '}
          <span className="text-[#5c5040]">(Kathmandu — probably still coding)</span>
        </span>
      ),
    }),
    echo: (a) => ({ print: <span className="text-[#ebdbb2]">{a.join(' ')}</span> }),
    pwd: () => ({ print: <span className="text-[#ebdbb2]">/home/amrit</span> }),
    history: () => ({
      print: (
        <div className="space-y-0.5 text-[#a89984]">
          {history.map((h, i) => (
            <div key={i}><span className="text-[#5c5040]">{i + 1} </span>{h}</div>
          ))}
        </div>
      ),
    }),
    pacman: (a) => ({
      print: (
        <span className="text-term-green">
          {a[0] === '-S' ? `installing ${a[1] || 'good-taste'}… done. you clearly know your way around. 😎` : 'usage: pacman -S <package>'}
        </span>
      ),
    }),
    sudo: () => ({
      print: (
        <span className="text-term-red">
          amrit is not in the sudoers file. This incident will be reported. 🙂
        </span>
      ),
    }),
    clear: () => ({ clear: true }),
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    // echo the entered line into the scrollback
    push(
      <div>
        <Prompt />
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
    if (res.clear) {
      setLines([]);
      return;
    }
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
    <section id="home" className="relative overflow-hidden px-4 pt-10 pb-16 md:pt-16 md:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #1793d1, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Big statement + doodle */}
        <div className="mb-8 text-center">
          <p className="mb-3 font-mono text-sm text-[#a89984]">
            {tagline}
            <span className="ml-0.5 inline-block w-2 animate-pulse text-primary" aria-hidden="true">▊</span>
          </p>
          <h1 className="text-4xl font-bold leading-[1.05] text-[#fbf1c7] sm:text-5xl md:text-6xl">
            I make the web feel
            <span className="relative mx-2 inline-block text-primary">
              alive
              <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-primary/70" />
            </span>
            <br className="hidden sm:block" />
            and load stupid fast.
          </h1>
        </div>

        {/* Interactive terminal */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="mx-auto max-w-2xl cursor-text overflow-hidden rounded-xl border border-[#3a3128] bg-[#221d17] shadow-2xl shadow-black/40"
        >
          {/* title bar */}
          <div className="flex items-center gap-2 border-b border-[#3a3128] bg-[#1b1712] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#fb4934]" />
            <span className="h-3 w-3 rounded-full bg-[#1793d1]" />
            <span className="h-3 w-3 rounded-full bg-[#b8bb26]" />
            <span className="ml-3 font-mono text-xs text-[#a89984]">amrit@arch: ~ — bash</span>
            <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-term-green">
              <span className="h-1.5 w-1.5 rounded-full bg-term-green" /> online
            </span>
          </div>

          {/* body */}
          <div
            ref={scrollRef}
            className="scanlines no-scrollbar h-72 space-y-1.5 overflow-y-auto px-5 py-4 font-mono text-[13px] leading-relaxed sm:text-sm"
          >
            {lines.map((l) => (
              <div key={l.id}>{l.node}</div>
            ))}

            {/* live input line */}
            <div className="flex items-center">
              <Prompt />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Terminal input — type a command"
                placeholder="type 'help'"
                style={{ caretColor: 'hsl(var(--primary))' }}
                className="flex-1 bg-transparent text-[#fbf1c7] outline-none placeholder:text-[#5c5040]"
              />
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#work"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            See my work <ArrowRight size={18} />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-[#3a3128] bg-[#221d17] px-5 py-3 font-semibold text-[#ebdbb2] transition-colors hover:border-primary"
          >
            Let&apos;s talk
          </Link>
          <a
            href={intro.resume}
            download
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold text-[#a89984] underline-offset-4 transition-colors hover:text-[#ebdbb2] hover:underline"
          >
            Resume
          </a>

          <div className="pointer-events-none absolute -right-2 -bottom-14 hidden items-center gap-1 text-primary/70 lg:flex">
            <Arrow className="h-10 w-14 rotate-[190deg]" />
            <span className="font-mono text-xs">psst — try it</span>
          </div>
        </div>

        {/* Cmd+K nudge */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() =>
              document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
            }
            className="inline-flex items-center gap-2 rounded-full border border-[#3a3128] bg-[#221d17] px-4 py-1.5 font-mono text-xs text-[#a89984] transition-colors hover:border-primary hover:text-[#ebdbb2]"
          >
            <Command size={13} /> Press{' '}
            <kbd className="rounded bg-[#2b241b] px-1.5 py-0.5 text-[#ebdbb2]">⌘K</kbd> to explore
          </button>
        </div>
      </div>
    </section>
  );
}
