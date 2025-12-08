'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['home', 'about', 'technology', 'portfolio', 'pricing', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navItems = [
    { id: 'home', label: 'Home' },
    // { id: 'about', label: 'About' },
        { id: 'portfolio', label: 'Portfolio' },
    { id: 'technology', label: 'Technology' },
  ];

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-2"
            >
              <span className="text-xl font-bold text-foreground hover:text-gray-300 transition-colors">
                Amrit Bhusal
              </span>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${activeSection === item.id
                  ? 'text-foreground font-semibold underline underline-offset-4'
                  : 'text-muted-foreground hover:text-foreground'
                  } transition-colors duration-200`}
              >
                {item.label}
              </button>
            ))}

            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-foreground text-background px-4 py-2 rounded-lg hover:bg-muted-foreground transition-colors duration-200 text-lg"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-foreground text-background px-4 py-2 rounded-lg hover:bg-muted-foreground transition-colors duration-200 text-lg"
            >
              Get Started
            </Button>
            <button
              onClick={toggleMenu}
              className="text-muted-foreground hover:text-foreground focus:outline-none"
            >
              {isOpen ? <div></div> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden fixed inset-0 z-40 transform transition-all duration-300 ease-in-out h-screen w-[75%] bg-background/95 backdrop-blur-sm border-r border-border`}
      >
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-4 pt-10">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2"
          >
            <span className="text-3xl font-bold text-foreground">
              Amrit Bhusal
            </span>
          </button>
          <button
            onClick={toggleMenu}
            className="text-muted-foreground hover:text-foreground focus:outline-none p-2"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${activeSection === item.id
                ? 'text-foreground font-semibold'
                : 'text-muted-foreground hover:text-foreground'
                } transition-colors duration-200 text-lg text-left`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;