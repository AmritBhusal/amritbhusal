'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Home,
  FolderGit2,
  Wrench,
  User,
  Mail,
  FileText,
  Github,
  Linkedin,
  MessageCircle,
  Copy,
} from 'lucide-react';
import intro from '@/components/Intro/intro.json';

const EMAIL = 'bhusalamrit41@gmail.com';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const run = useCallback((fn: () => void) => {
    setOpen(false);
    // let the dialog close before scrolling/navigating
    setTimeout(fn, 60);
  }, []);

  const goto = (id: string) => () =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const openUrl = (url: string) => () => window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => run(goto('home'))}>
            <Home /> Home
          </CommandItem>
          <CommandItem onSelect={() => run(goto('work'))}>
            <FolderGit2 /> Work
          </CommandItem>
          <CommandItem onSelect={() => run(goto('skills'))}>
            <Wrench /> Skills
          </CommandItem>
          <CommandItem onSelect={() => run(goto('about'))}>
            <User /> About
          </CommandItem>
          <CommandItem onSelect={() => run(goto('contact'))}>
            <Mail /> Contact
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => run(() => window.open(intro.resume, '_blank'))}>
            <FileText /> Download résumé
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigator.clipboard?.writeText(EMAIL))}>
            <Copy /> Copy email address
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Elsewhere">
          <CommandItem onSelect={() => run(openUrl(intro.socialLinks.github))}>
            <Github /> GitHub
          </CommandItem>
          <CommandItem onSelect={() => run(openUrl(intro.socialLinks.linkedin))}>
            <Linkedin /> LinkedIn
          </CommandItem>
          <CommandItem onSelect={() => run(openUrl(intro.socialLinks.whatsapp))}>
            <MessageCircle /> WhatsApp
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
