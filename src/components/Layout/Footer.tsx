'use client';

import { Mail } from 'lucide-react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
          {/* Inspiring Message */}
          <div className="bg-muted/30 backdrop-blur-sm px-6 py-4 rounded-none border border-border">
            <p className="text-muted-foreground text-center max-w-2xl text-lg">
              Turn your dreams into reality through the power of technology and innovation.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-all duration-200"
                aria-label={link.label}
              >
                {link.icon}
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