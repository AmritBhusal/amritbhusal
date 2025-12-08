'use client';

import React from 'react';
import { FaHtml5, FaCss3Alt, FaBootstrap, FaJs, FaReact, FaGitAlt, FaGithub, FaBitbucket } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMui, SiHiveBlockchain, SiSolidity } from 'react-icons/si';
import technologyData from './technology.json';

interface Technology {
  icon: string;
  color: string;
  name: string;
}

const Technology: React.FC = () => {
  // Removed scroll refs and state for static classic view

  const iconComponents = {
    FaHtml5,
    FaCss3Alt,
    FaBootstrap,
    FaJs,
    FaReact,
    FaGitAlt,
    FaGithub,
    FaBitbucket,
    SiNextdotjs,
    SiTailwindcss,
    SiMui,
    SiHiveBlockchain,
    SiSolidity
  };

  // Map all colors to a monochrome styling handled by Tailwind classes instead of inline styles
  // We will ignore the 'color' prop from JSON for the specific hex value and use CSS classes

  // Use original list, no duplication needed for scrolling
  const technologies = technologyData.technologies;

  return (
    <div className='flex flex-col items-center justify-center w-[95%] overflow-hidden py-10'>
      <div className='flex flex-col items-center justify-center w-full gap-10'>
        <div className='w-full flex items-center justify-center'>
          <span className='font-bold text-3xl whitespace-nowrap text-center text-foreground'>Technologies Explored</span>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6">
            {technologies.map((tech: Technology, index: number) => {
              const IconComponent = iconComponents[tech.icon as keyof typeof iconComponents];
              return (
                <div key={index} className="flex flex-col items-center justify-center w-32 h-32 p-4 border border-border bg-card hover:bg-muted transition-colors duration-200">
                  <IconComponent
                    className="h-12 w-12 text-muted-foreground group-hover:text-foreground mb-3"
                  />
                  <span className="text-sm font-medium text-foreground text-center">{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technology;