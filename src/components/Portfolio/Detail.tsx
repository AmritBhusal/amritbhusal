'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import WebsitePreview from './WebsitePreview';
import { BsGithub } from 'react-icons/bs';
import { SquareArrowOutUpRight, ArrowLeft, Tag, User2, GitBranch, Book, ExternalLink } from 'lucide-react';
import portfolioData from './portfolio.json';
import Link from 'next/link';

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value, href }) => (
  <div className="flex items-start gap-3 p-4 bg-[#161b22] border border-[#30363d] rounded-md">
    <div className="text-[#58a6ff]">{icon}</div>
    <div>
      <p className="text-sm text-[#8b949e]">{label}</p>
      {href && href !== '#' ? (
        <a href={href} className="text-[#58a6ff] hover:underline font-medium" target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      ) : (
        <p className="font-medium text-[#c9d1d9]">{value}</p>
      )}
    </div>
  </div>
);

const ProjectDetail: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  const project = portfolioData.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#c9d1d9] mb-4">Project not found</h1>
          <Link href="/" className="text-[#58a6ff] hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const getLanguageColor = (): string => {
    const techDetails = project.technicalDetails.join(' ').toLowerCase();
    if (techDetails.includes('typescript') || techDetails.includes('next.js')) return '#3178c6';
    if (techDetails.includes('solidity')) return '#AA6746';
    if (techDetails.includes('react') || techDetails.includes('javascript')) return '#f1e05a';
    return '#3178c6';
  };

  const getLanguageName = (): string => {
    const techDetails = project.technicalDetails.join(' ').toLowerCase();
    if (techDetails.includes('typescript')) return 'TypeScript';
    if (techDetails.includes('next.js')) return 'TypeScript';
    if (techDetails.includes('solidity')) return 'Solidity';
    if (techDetails.includes('javascript')) return 'JavaScript';
    return 'TypeScript';
  };

  return (
    <div className="min-h-screen bg-[#0d1117] py-8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="flex items-center gap-2 text-[#58a6ff] hover:underline">
            <ArrowLeft size={16} />
            <span>Back to Profile</span>
          </Link>
          <span className="text-[#8b949e]">/</span>
          <span className="text-[#8b949e]">{project.name}</span>
        </div>

        {/* Repository Header Style */}
        <div className="border border-[#30363d] rounded-md bg-[#0d1117] mb-6">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#30363d] bg-[#161b22] rounded-t-md">
            <div className="flex items-center gap-2 flex-wrap">
              <Book size={20} className="text-[#8b949e]" />
              <h1 className="text-xl font-semibold text-[#58a6ff]">{project.name}</h1>
              <span className="border border-[#30363d] rounded-full px-2 py-0.5 text-[10px] text-[#8b949e] font-medium">
                {project.type === 'client' ? 'Private' : 'Public'}
              </span>
            </div>
            <p className="text-[#8b949e] text-sm mt-1">{project.details}</p>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 flex flex-wrap gap-3">
            {project.demoUrl !== '#' && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#238636] text-white rounded-md font-semibold text-sm hover:bg-[#2ea043] transition-colors border border-[rgba(240,246,252,0.1)]"
              >
                <SquareArrowOutUpRight size={16} />
                Live Demo
              </a>
            )}
            {project.codeUrl !== '#' && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#21262d] text-[#c9d1d9] rounded-md font-semibold text-sm hover:bg-[#30363d] transition-colors border border-[#30363d]"
              >
                <BsGithub size={16} />
                View Code
              </a>
            )}
          </div>
        </div>

        {/* Project Meta Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InfoCard icon={<Tag size={18} />} label="Project Type" value={project.type.charAt(0).toUpperCase() + project.type.slice(1)} />
          <InfoCard icon={<User2 size={18} />} label="Role" value={project.role} />
          <div className="flex items-start gap-3 p-4 bg-[#161b22] border border-[#30363d] rounded-md">
            <div className="text-[#58a6ff]"><GitBranch size={18} /></div>
            <div>
              <p className="text-sm text-[#8b949e]">Language</p>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor() }}></span>
                <span className="font-medium text-[#c9d1d9]">{getLanguageName()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* README Style Overview */}
            <div className="border border-[#30363d] rounded-md bg-[#0d1117]">
              <div className="px-4 py-3 border-b border-[#30363d] bg-[#161b22] rounded-t-md">
                <span className="text-sm text-[#c9d1d9] font-semibold">README.md</span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-[#c9d1d9] border-b border-[#30363d] pb-4 mb-4">
                  {project.name}
                </h2>
                <p className="text-[#c9d1d9] leading-relaxed mb-4">{project.details}</p>
                <p className="text-[#8b949e] leading-relaxed">{project.description}</p>
              </div>
            </div>

            {/* Technical Implementation */}
            <div className="border border-[#30363d] rounded-md bg-[#0d1117]">
              <div className="px-4 py-3 border-b border-[#30363d] bg-[#161b22] rounded-t-md">
                <span className="text-sm text-[#c9d1d9] font-semibold">Technical Implementation</span>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {project.technicalDetails.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3 text-[#c9d1d9]">
                      <span className="text-[#238636] mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div className="border border-[#30363d] rounded-md bg-[#0d1117]">
              <div className="px-4 py-3 border-b border-[#30363d] bg-[#161b22] rounded-t-md">
                <span className="text-sm text-[#c9d1d9] font-semibold">Challenges & Solutions</span>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3 text-[#c9d1d9]">
                      <span className="text-[#f78166] mt-1">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Key Features */}
            <div className="border border-[#30363d] rounded-md bg-[#0d1117]">
              <div className="px-4 py-3 border-b border-[#30363d] bg-[#161b22] rounded-t-md">
                <span className="text-sm text-[#c9d1d9] font-semibold">Key Features</span>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {project.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#58a6ff] rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-[#c9d1d9] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Project Image */}
            <div className="border border-[#30363d] rounded-md bg-[#0d1117] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#30363d] bg-[#161b22] flex items-center justify-between">
                <span className="text-sm text-[#c9d1d9] font-semibold">Preview</span>
                {project.demoUrl !== '#' && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#58a6ff] hover:underline font-medium"
                  >
                    <ExternalLink size={12} />
                    Visit Website
                  </a>
                )}
              </div>
              <WebsitePreview
                demoUrl={project.demoUrl}
                image={project.image}
                name={project.name}
              />
            </div>

            {/* Quick Links */}
            <div className="border border-[#30363d] rounded-md bg-[#0d1117]">
              <div className="px-4 py-3 border-b border-[#30363d] bg-[#161b22] rounded-t-md">
                <span className="text-sm text-[#c9d1d9] font-semibold">Links</span>
              </div>
              <div className="p-4 space-y-3">
                {project.demoUrl !== '#' && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#58a6ff] hover:underline text-sm"
                  >
                    <ExternalLink size={14} />
                    View Live Demo
                  </a>
                )}
                {project.codeUrl !== '#' && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#58a6ff] hover:underline text-sm"
                  >
                    <BsGithub size={14} />
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;