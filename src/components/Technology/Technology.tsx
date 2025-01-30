import React from 'react'
import { FaHtml5, FaCss3Alt, FaBootstrap, FaJs, FaReact, FaGitAlt, FaGithub, FaBitbucket} from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMui, SiHiveBlockchain, SiSolidity } from 'react-icons/si';
import technologyData from './technology.json';

const Technology = () => {
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

  // Convert Tailwind color classes to hex codes
  const colorMap = {
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

  // Duplicate the technologies array for seamless infinite scroll
  const duplicatedTechnologies = [...technologyData.technologies, ...technologyData.technologies];

  return (
    <div className='flex flex-col items-center justify-center w-[95%] overflow-hidden'>
        <div className='flex flex-col items-center justify-center w-full gap-10'>
            <div className='w-full flex items-center justify-center'>
                <span className='font-bold text-3xl whitespace-nowrap text-center'>Technologies Explored</span>
            </div>
            <div className="w-full overflow-hidden relative">
                <div className="flex gap-16 animate-scroll">
                    {duplicatedTechnologies.map((tech, index) => {
                        const IconComponent = iconComponents[tech.icon as keyof typeof iconComponents];
                        return (
                            <div key={index} className="flex flex-col items-center flex-shrink-0">
                                <IconComponent 
                                    className="h-24 w-24" 
                                    color={colorMap[tech.color as keyof typeof colorMap]} 
                                />
                                <span className="mt-2 text-lg font-medium whitespace-nowrap">{tech.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Technology