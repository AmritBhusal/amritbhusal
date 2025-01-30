'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
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
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'technology', label: 'Technology' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'pricing', label: 'Pricing' },    
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand name */}
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-2"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
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
                className={`${
                  activeSection === item.id
                    ? 'text-purple-600 font-medium'
                    : 'text-gray-700 hover:text-purple-600'
                } transition-colors duration-200`}
              >
                {item.label}
              </button>
            ))}

            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-lg"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-lg"
            >
              Get Started
            </Button>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden fixed inset-0 z-40 transform transition-all duration-300 ease-in-out h-screen w-[75%] bg-white backdrop-blur-sm`}
      >
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-4 pt-10">
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2"
          >
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Amrit Bhusal
            </span>
          </button>
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-purple-600 focus:outline-none p-2"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${
                activeSection === item.id
                  ? 'text-purple-600 font-medium'
                  : 'text-gray-700 hover:text-purple-600'
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