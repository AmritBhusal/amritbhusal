'use client';

import React, { useRef, useState, useEffect } from 'react';
import { FaHtml5, FaCss3Alt, FaBootstrap, FaJs, FaReact, FaGitAlt, FaGithub, FaBitbucket} from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMui, SiHiveBlockchain, SiSolidity } from 'react-icons/si';
import technologyData from './technology.json';

interface Technology {
  icon: string;
  color: string;
  name: string;
}

const Technology: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

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

  const colorMap: Record<string, string> = {
    'text-orange-600': '#EA580C',
    'text-blue-600': '#2563EB',
    'text-black': '#000000',
    'text-blue-500': '#3B82F6',
    'text-purple-600': '#9333EA',
    'text-yellow-500': '#EAB308',
    'text-blue-400': '#60A5FA',
    'text-orange-500': '#F97316',
    'text-green-600': '#16A34A',
    'text-gray-800': '#1F2937'
  };

  const duplicatedTechnologies = [...technologyData.technologies, ...technologyData.technologies];

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    
    if (scrollContainer) {
      scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
      scrollContainer.addEventListener('touchend', handleMouseUp);

      return () => {
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchmove', handleTouchMove);
        scrollContainer.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, startX, scrollLeft]);

  return (
    <div className='flex flex-col items-center justify-center w-[95%] overflow-hidden'>
      <div className='flex flex-col items-center justify-center w-full gap-10'>
        <div className='w-full flex items-center justify-center'>
          <span className='font-bold text-3xl whitespace-nowrap text-center'>Technologies Explored</span>
        </div>
        <div 
          ref={scrollRef}
          className="w-full overflow-hidden relative touch-pan-x"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
        >
          <div className="flex gap-16 animate-scroll md:animate-scroll-desktop">
            {duplicatedTechnologies.map((tech: Technology, index: number) => {
              const IconComponent = iconComponents[tech.icon as keyof typeof iconComponents];
              return (
                <div key={index} className="flex flex-col items-center flex-shrink-0">
                  <IconComponent 
                    className="h-24 w-24" 
                    color={colorMap[tech.color]} 
                  />
                  <span className="mt-2 text-lg font-medium whitespace-nowrap">{tech.name}</span>
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