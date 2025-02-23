'use client';

import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { 
  Moon, 
  Printer, 
  Mail, 
  ArrowUpDown,
  CornerDownLeft,
  X
} from 'lucide-react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import profileData from './data.json';

interface CommandDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CommandDialog = ({ open, onOpenChange }: CommandDialogProps) => {
  const { profile } = profileData;

  const commandItems = [
    {
      category: "Actions",
      items: [
        { icon: <Moon size={16} />, label: "Toggle Dark Mode", shortcut: "Ctrl O", action: () => console.log('Toggle Dark Mode') },
        { icon: <Printer size={16} />, label: "Print Resume", shortcut: "Ctrl P", action: () => console.log('Print Resume') },
        { icon: <Mail size={16} />, label: "Contact Me", shortcut: "Ctrl E", action: () => window.open(profile.socials.email) },
      ]
    },
    {
      category: "Social",
      items: [
        { icon: <X size={16} />, label: "Visit X / Twitter", shortcut: "Ctrl X", action: () => window.open(profile.socials.twitter, '_blank') },
        { icon: <BsLinkedin size={16} />, label: "Visit LinkedIn", shortcut: "Ctrl L", action: () => window.open(profile.socials.linkedin, '_blank') },
        { icon: <BsGithub size={16} />, label: "Visit GitHub", shortcut: "Ctrl G", action: () => window.open(profile.socials.github, '_blank') },
        { icon: <Mail size={16} />, label: "Visit Email", shortcut: "Ctrl E", action: () => window.open(profile.socials.email) },
      ]
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const shortcuts: { [key: string]: () => void } = {
        'o': () => e.ctrlKey && commandItems[0].items[0].action(),
        'p': () => e.ctrlKey && commandItems[0].items[1].action(),
        'e': () => e.ctrlKey && commandItems[0].items[2].action(),
        'x': () => e.ctrlKey && commandItems[1].items[0].action(),
        'l': () => e.ctrlKey && commandItems[1].items[1].action(),
        'g': () => e.ctrlKey && commandItems[1].items[2].action(),
      };

      if (shortcuts[e.key.toLowerCase()]) {
        e.preventDefault();
        shortcuts[e.key.toLowerCase()]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 bg-[#0d0d12] max-h-[80vh] border border-gray-800">
        <DialogTitle className="sr-only">Command Menu</DialogTitle>
        <Command className="rounded-lg bg-[#0d0d12]">
          <CommandInput 
            placeholder="Search Command" 
            className="border-b border-gray-800 focus:ring-0 bg-[#0d0d12] placeholder:text-gray-400"
          />
          <CommandList className="bg-[#0d0d12] max-h-[60vh] text-gray-300">
            <CommandEmpty className="text-gray-400 py-6">
              No results found.
            </CommandEmpty>
            {commandItems.map((section, index) => (
              <CommandGroup 
                key={index} 
                heading={section.category}
                className="text-gray-500 text-sm"
              >
                {section.items.map((item, itemIndex) => (
                  <CommandItem
                    key={itemIndex}
                    onSelect={item.action}
                    className="flex items-center justify-between py-3 px-4 aria-selected:bg-[#1a1b26] hover:bg-[#1a1b26] cursor-pointer text-gray-300"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {item.shortcut.split(' ').map((key, keyIndex) => (
                        <span
                          key={keyIndex}
                          className="px-2 py-1 text-xs rounded bg-[#1e1f2e] text-gray-400"
                        >
                          {key}
                        </span>
                      ))}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>

        <div className="border-t border-gray-800 p-2 text-xs text-gray-500 flex items-center justify-between bg-[#0d0d12]">
          <div className="flex items-center gap-2">
            <CornerDownLeft size={14} />
            <span>to select</span>
            <ArrowUpDown size={14} className="ml-2" />
            <span>to navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-[#1e1f2e]">Ctrl + K</span>
            <span className="px-2 py-1 rounded bg-[#1e1f2e]">Escape</span>
            <span>to close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommandDialog;