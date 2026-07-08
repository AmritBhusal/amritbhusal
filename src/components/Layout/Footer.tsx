'use client';

import { Mail } from 'lucide-react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Admin has its own chrome — no public footer there.
  if (pathname?.startsWith('/admin')) return null;

  const socialLinks = [
    {
      icon: <BsGithub size={20} />,
      href: 'https://github.com/AmritBhusal',
      label: 'GitHub'
    },
    {
      icon: <BsLinkedin size={20} />,
      href: 'https://www.linkedin.com/in/amrit-bhusal1/',
      label: 'LinkedIn'
    },
    {
      icon: <Mail size={20} />,
      href: 'mailto:bhusalamrit41@gmail.com',
      label: 'Email'
    }
  ];

  return (
    <footer className="relative bg-background border-t border-border">
      {/* Subtle Grid Pattern REMOVED */}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Inspiring Message — terminal styled */}
          <div className="rounded-md border border-border bg-[#221d17] px-6 py-4 font-mono text-sm shadow-lg shadow-black/30">
            <span className="text-term-green">[amrit@arch ~]$</span>{' '}
            <span className="text-[#a89984]">echo </span>
            <span className="text-[#fbf1c7]">
              &quot;Turn your dreams into reality through the power of tech.&quot;
            </span>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1 text-muted-foreground transition-transform duration-200 hover:-translate-y-1 hover:text-primary"
                aria-label={link.label}
              >
                {link.icon}
                <span className="text-[10px] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {link.label}
                </span>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-muted-foreground text-sm text-center">
            © {currentYear} Amrit Bhusal. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;