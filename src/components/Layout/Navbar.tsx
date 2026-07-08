'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, FileText, Command } from 'lucide-react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import intro from '@/components/Intro/intro.json';

const socials = [
  { icon: <BsGithub size={18} />, href: intro.socialLinks.github, label: 'GitHub' },
  { icon: <BsLinkedin size={18} />, href: intro.socialLinks.linkedin, label: 'LinkedIn' },
];

const links = [
  { href: '/#work', label: 'Work' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Admin has its own chrome — no public nav there.
  if (pathname?.startsWith('/admin')) return null;

  const openPalette = () =>
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md">
        <nav
          className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-4 md:px-6"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="font-mono text-lg font-bold text-foreground transition-colors hover:text-primary"
          >
            amrit<span className="text-primary">.</span>dev
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            {pathname === '/' && (
              <button
                onClick={openPalette}
                aria-label="Open command palette"
                className="flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Command size={12} /> K
              </button>
            )}
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.icon}
              </a>
            ))}
            <a
              href={intro.resume}
              download
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <FileText size={15} /> Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="p-1 text-foreground md:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="border-b border-border bg-background px-4 py-4 md:hidden"
          >
            <div className="flex flex-col gap-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.icon}
                </a>
              ))}
              <a
                href={intro.resume}
                download
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground"
              >
                <FileText size={15} /> Resume
              </a>
            </div>
          </div>
        )}
      </header>
      {/* Spacer so the fixed header doesn't overlap content */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
};

export default Navbar;
