import React from 'react';
import { FaHtml5, FaCss3Alt, FaBootstrap, FaJs, FaReact, FaGitAlt, FaBitbucket, FaGithub } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMui, SiHiveBlockchain, SiSolidity, SiTypescript } from 'react-icons/si';
import introData from './intro.json';
import aboutData from '../About/about.json';
import { TabType } from './types';
import PinnedProjects from './PinnedProjects';

interface OverviewTabProps {
    onNavigate: (tab: TabType) => void;
}

const technologies = [
    { name: 'HTML5', icon: FaHtml5, color: '#e34f26' },
    { name: 'CSS3', icon: FaCss3Alt, color: '#1572b6' },
    { name: 'JavaScript', icon: FaJs, color: '#f7df1e' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
    { name: 'React', icon: FaReact, color: '#61dafb' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06b6d4' },
    { name: 'Bootstrap', icon: FaBootstrap, color: '#7952b3' },
    { name: 'Material UI', icon: SiMui, color: '#007fff' },
    { name: 'Git', icon: FaGitAlt, color: '#f05032' },
    { name: 'GitHub', icon: FaGithub, color: '#ffffff' },
    { name: 'Bitbucket', icon: FaBitbucket, color: '#0052cc' },
    { name: 'Blockchain', icon: SiHiveBlockchain, color: '#3c3c3d' },
    { name: 'Solidity', icon: SiSolidity, color: '#AA6746' },
];

const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigate }) => {
    return (
        <>
            {/* README Section */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#8b949e]">AmritBhusal / README.md</span>
                </div>
                <div className="border border-[#30363d] rounded-md bg-[#0d1117] p-6 lg:p-10">
                    <h2 className="text-3xl font-bold border-b border-[#30363d] pb-2 mb-6 text-[#c9d1d9]">
                        Hi there 👋, I&apos;m {introData.name}
                    </h2>

                    <div className="space-y-4 text-[#c9d1d9]">
                        <p className="text-lg">
                            {introData.greeting} I&apos;m <span className="font-semibold text-[#58a6ff]">{introData.role}</span> from {aboutData.details.city}.
                        </p>

                        <p>
                            {introData.ctaDescription}
                        </p>

                        <div className="py-4">
                            <h3 className="text-xl font-bold mb-3">About Me</h3>
                            <ul className="list-disc list-inside space-y-1 text-[#8b949e]">
                                <li>🔭 I&apos;m currently working on <strong>Ecommerce and Travel Websites</strong></li>
                                <li>💼 I&apos;m also working as a <strong>Freelancer</strong></li>
                                <li>🌱 I&apos;m currently learning <strong>Advanced Next.js </strong></li>
                                <li>👯 I&apos;m looking to collaborate on <strong>Open Source Projects</strong></li>
                                <li>💬 Ask me about <strong>React, Next.js, Tailwind, Frontend</strong></li>
                                <li>⚡ Fun fact: <strong>I love coding in Dark Mode</strong></li>
                            </ul>
                        </div>

                        {/* Skills & Technologies */}
                        <div className="py-4 border-t border-[#30363d]">
                            <h3 className="text-xl font-bold mb-4">🛠️ Skills & Technologies</h3>
                            <div className="flex flex-wrap gap-3">
                                {technologies.map((tech, index) => {
                                    const IconComponent = tech.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 px-3 py-2 bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d] transition-colors"
                                        >
                                            <IconComponent size={18} style={{ color: tech.color }} />
                                            <span className="text-sm text-[#c9d1d9]">{tech.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <a href={introData.resume} download className="px-4 py-2 bg-[#238636] text-white rounded-md font-semibold text-sm hover:bg-[#2ea043] transition-colors border border-[rgba(240,246,252,0.1)]">
                                View Resume
                            </a>
                            <button
                                onClick={() => onNavigate('projects')}
                                className="px-4 py-2 bg-[#21262d] text-[#58a6ff] rounded-md font-semibold text-sm hover:bg-[#30363d] transition-colors border border-[#30363d]"
                            >
                                Contact Me
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pinned Repositories */}
            <PinnedProjects />
        </>
    );
};

export default OverviewTab;
