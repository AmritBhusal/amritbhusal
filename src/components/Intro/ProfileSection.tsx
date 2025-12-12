'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Link as LinkIcon, Mail, Users, GitBranch, Book, Package, FolderKanban, Search } from 'lucide-react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaHtml5, FaCss3Alt, FaBootstrap, FaJs, FaReact, FaGitAlt, FaBitbucket } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMui, SiHiveBlockchain, SiSolidity, SiTypescript } from 'react-icons/si';
import introData from './intro.json';
import aboutData from '../About/about.json';
import portfolioData from '../Portfolio/portfolio.json';
import ContactForm from '../Contact/ContactForm';

type TabType = 'overview' | 'repositories' | 'projects';

interface Project {
    id: string;
    type: string;
    name: string;
    image: string;
    demoUrl: string;
    details: string;
    codeUrl: string;
    role: string;
    description: string;
    technicalDetails: string[];
    keyFeatures: string[];
    challenges: string[];
}

const ProfileSection = () => {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const [searchQuery, setSearchQuery] = useState('');

    const projects: Project[] = portfolioData as Project[];
    const sortedProjects = [...projects].sort((a, b) => Number(b.id) - Number(a.id));
    const pinnedProjects = sortedProjects.slice(0, 4);
    const totalRepos = projects.length;

    const filteredRepos = searchQuery
        ? sortedProjects.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.details.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : sortedProjects;

    const getLanguageColor = (project: Project): string => {
        const techDetails = project.technicalDetails.join(' ').toLowerCase();
        if (techDetails.includes('typescript') || techDetails.includes('next.js')) return '#3178c6';
        if (techDetails.includes('solidity')) return '#AA6746';
        if (techDetails.includes('react') || techDetails.includes('javascript')) return '#f1e05a';
        return '#3178c6';
    };

    const getLanguageName = (project: Project): string => {
        const techDetails = project.technicalDetails.join(' ').toLowerCase();
        if (techDetails.includes('typescript')) return 'TypeScript';
        if (techDetails.includes('next.js')) return 'TypeScript';
        if (techDetails.includes('solidity')) return 'Solidity';
        if (techDetails.includes('javascript')) return 'JavaScript';
        return 'TypeScript';
    };

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

    const renderOverviewTab = () => (
        <>
            {/* README Section */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#8b949e]">AmritBhusal / README.md</span>
                </div>
                <div className="border border-[#30363d] rounded-md bg-[#0d1117] p-6 lg:p-10">
                    <h2 className="text-3xl font-bold border-b border-[#30363d] pb-2 mb-6 text-[#c9d1d9]">
                        Hi there 👋, I'm {introData.name}
                    </h2>

                    <div className="space-y-4 text-[#c9d1d9]">
                        <p className="text-lg">
                            {introData.greeting} I'm <span className="font-semibold text-[#58a6ff]">{introData.role}</span> from {aboutData.details.city}.
                        </p>

                        <p>
                            {introData.ctaDescription}
                        </p>

                        <div className="py-4">
                            <h3 className="text-xl font-bold mb-3">About Me</h3>
                            <ul className="list-disc list-inside space-y-1 text-[#8b949e]">
                                <li>🔭 I'm currently working on <strong>Ecommerce and Travel Websites</strong></li>
                                <li>🌱 I'm currently learning <strong>Advanced Next.js </strong></li>
                                <li>👯 I'm looking to collaborate on <strong>Open Source Projects</strong></li>
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
                                onClick={() => setActiveTab('projects')}
                                className="px-4 py-2 bg-[#21262d] text-[#58a6ff] rounded-md font-semibold text-sm hover:bg-[#30363d] transition-colors border border-[#30363d]"
                            >
                                Contact Me
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pinned Repositories */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[16px] font-semibold text-[#c9d1d9]">Pinned</h2>
                    <span className="text-xs text-[#58a6ff] cursor-pointer hover:underline">Customize your pins</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pinnedProjects.map((project) => (
                        <div key={project.id} className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-[#58a6ff] font-semibold cursor-pointer hover:underline">
                                <Book size={16} className="text-[#8b949e]" />
                                <a href={project.codeUrl !== '#' ? project.codeUrl : project.demoUrl} target="_blank" rel="noopener noreferrer">
                                    {project.name.toLowerCase().replace(/\s+/g, '-').substring(0, 25)}
                                </a>
                                <span className="border border-[#30363d] rounded-full px-2 text-[10px] text-[#8b949e] font-medium">
                                    {project.type === 'client' ? 'Private' : 'Public'}
                                </span>
                            </div>
                            <p className="text-xs text-[#8b949e] line-clamp-2">{project.details}</p>
                            <div className="flex items-center gap-4 mt-auto pt-2 text-xs text-[#8b949e]">
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor(project) }}></span>
                                    {getLanguageName(project)}
                                </div>
                                <div className="flex items-center gap-1"><GitBranch size={12} /> {Math.floor(Math.random() * 5) + 1}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

    const renderRepositoriesTab = () => (
        <div className="w-full">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8b949e]" />
                    <input
                        type="text"
                        placeholder="Find a repository..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#c9d1d9] text-sm focus:outline-none focus:border-[#58a6ff] placeholder-[#8b949e]"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="px-3 py-2 bg-[#21262d] border border-[#30363d] rounded-md text-[#c9d1d9] text-sm focus:outline-none focus:border-[#58a6ff]">
                        <option>Type</option>
                        <option>Public</option>
                        <option>Private</option>
                    </select>
                    <select className="px-3 py-2 bg-[#21262d] border border-[#30363d] rounded-md text-[#c9d1d9] text-sm focus:outline-none focus:border-[#58a6ff]">
                        <option>Language</option>
                        <option>TypeScript</option>
                        <option>JavaScript</option>
                    </select>
                    <select className="px-3 py-2 bg-[#21262d] border border-[#30363d] rounded-md text-[#c9d1d9] text-sm focus:outline-none focus:border-[#58a6ff]">
                        <option>Sort</option>
                        <option>Last updated</option>
                        <option>Name</option>
                    </select>
                </div>
            </div>

            {/* Repository List */}
            <div className="border border-[#30363d] rounded-md divide-y divide-[#30363d]">
                {filteredRepos.map((project) => (
                    <div key={project.id} className="p-4 hover:bg-[#161b22] transition-colors">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <a
                                        href={project.codeUrl !== '#' ? project.codeUrl : project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#58a6ff] font-semibold hover:underline text-lg"
                                    >
                                        {project.name}
                                    </a>
                                    <span className="border border-[#30363d] rounded-full px-2 py-0.5 text-[10px] text-[#8b949e] font-medium">
                                        {project.type === 'client' ? 'Private' : 'Public'}
                                    </span>
                                </div>
                                <p className="text-[#8b949e] text-sm mt-1 line-clamp-2">{project.details}</p>
                                <div className="flex items-center gap-4 mt-3 text-xs text-[#8b949e]">
                                    <div className="flex items-center gap-1">
                                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor(project) }}></span>
                                        {getLanguageName(project)}
                                    </div>
                                    <div className="flex items-center gap-1"><GitBranch size={12} /> {Math.floor(Math.random() * 5) + 1}</div>
                                    <span>Updated recently</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {project.demoUrl !== '#' && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 text-xs bg-[#21262d] border border-[#30363d] rounded-md text-[#c9d1d9] hover:bg-[#30363d] transition-colors"
                                    >
                                        Demo
                                    </a>
                                )}
                                {project.codeUrl !== '#' && (
                                    <a
                                        href={project.codeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 text-xs bg-[#21262d] border border-[#30363d] rounded-md text-[#c9d1d9] hover:bg-[#30363d] transition-colors"
                                    >
                                        Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredRepos.length === 0 && (
                <div className="text-center py-12 text-[#8b949e]">
                    <p>No repositories found matching "{searchQuery}"</p>
                </div>
            )}
        </div>
    );

    const renderProjectsTab = () => (
        <div className="w-full">
            <div className="border border-[#30363d] rounded-md bg-[#0d1117] overflow-hidden">
                <div className="bg-[#161b22] px-6 py-4 border-b border-[#30363d]">
                    <div className="flex items-center gap-2">
                        <FolderKanban size={20} className="text-[#8b949e]" />
                        <h2 className="text-lg font-semibold text-[#c9d1d9]">Get In Touch</h2>
                    </div>
                    <p className="text-sm text-[#8b949e] mt-1">Have a project in mind? Let's collaborate!</p>
                </div>
                <div className="p-0">
                    <ContactForm />
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-8 text-[#c9d1d9]">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Left Sidebar - Profile Info */}
                <div className="w-full md:w-[296px] flex flex-col gap-4 flex-shrink-0">
                    <div className="relative group w-[296px] h-[296px] mx-auto md:mx-0">
                        <div className="rounded-full overflow-hidden border border-[#30363d] w-full h-full bg-[#0d1117]">
                            <Image
                                src="/profile.jpg"
                                alt="Profile"
                                width={296}
                                height={296}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                        {/* Status Icon */}
                        <div className="absolute bottom-10 right-0 md:right-4 bg-[#21262d] p-2 rounded-full border border-[#30363d] shadow-sm cursor-pointer hover:text-[#58a6ff] transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center">🎯</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 px-2">
                        <h1 className="text-2xl font-bold text-[#c9d1d9] leading-tight">
                            {introData.name}
                        </h1>
                        <span className="text-xl text-[#8b949e] font-light">AmritBhusal</span>
                    </div>

                    <div className="px-2">
                        <p className="text-[#c9d1d9] text-[16px] leading-[1.5]">
                            {aboutData.description}
                        </p>
                    </div>

                    <div className="px-2 w-full">

                        <div className="flex flex-col gap-2 text-[#c9d1d9] text-sm">
                            <div className="flex items-center gap-2">
                                <Users size={16} className="text-[#8b949e]" />
                                <span>{introData.role}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-[#8b949e]" />
                                <span>{aboutData.details.city}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={16} className="text-[#8b949e]" />
                                <a href="mailto:bhusalamrit41@gmail.com" className="hover:text-[#58a6ff] hover:underline">bhusalamrit41@gmail.com</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <LinkIcon size={16} className="text-[#8b949e]" />
                                <a href={aboutData.details.website} target="_blank" className="hover:text-[#58a6ff] hover:underline truncate max-w-[200px]">
                                    {aboutData.details.website}
                                </a>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#30363d] w-full">
                            <h3 className="font-semibold text-base mb-2">Socials</h3>
                            <div className="flex gap-2">
                                <a href={introData.socialLinks.github || "#"} className="p-2 bg-[#21262d] rounded-md border border-[#30363d] hover:bg-[#30363d] text-[#c9d1d9]"><FaGithub size={18} /></a>
                                <a href={introData.socialLinks.linkedin} className="p-2 bg-[#21262d] rounded-md border border-[#30363d] hover:bg-[#30363d] text-[#c9d1d9]"><FaLinkedin size={18} /></a>
                                <a href={introData.socialLinks.facebook} className="p-2 bg-[#21262d] rounded-md border border-[#30363d] hover:bg-[#30363d] text-[#c9d1d9]"><FaFacebook size={18} /></a>
                                <a href={introData.socialLinks.instagram} className="p-2 bg-[#21262d] rounded-md border border-[#30363d] hover:bg-[#30363d] text-[#c9d1d9]"><FaInstagram size={18} /></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content - Tabs and Content */}
                <div className="flex-1 min-w-0">
                    {/* Tabs */}
                    <div className="flex items-center gap-4 border-b border-[#30363d] mb-4 overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex items-center gap-2 px-4 py-2 font-semibold cursor-pointer whitespace-nowrap transition-colors ${activeTab === 'overview'
                                    ? 'border-b-2 border-[#f78166] text-[#c9d1d9]'
                                    : 'hover:bg-[#161b22] rounded-t-md text-[#8b949e]'
                                }`}
                        >
                            <Book size={16} /> Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('repositories')}
                            className={`flex items-center gap-2 px-4 py-2 font-semibold cursor-pointer whitespace-nowrap transition-colors ${activeTab === 'repositories'
                                    ? 'border-b-2 border-[#f78166] text-[#c9d1d9]'
                                    : 'hover:bg-[#161b22] rounded-t-md text-[#8b949e]'
                                }`}
                        >
                            <Package size={16} /> Repositories
                            <span className="text-xs bg-[#21262d] px-2 rounded-full text-[#8b949e]">{totalRepos}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`flex items-center gap-2 px-4 py-2 font-semibold cursor-pointer whitespace-nowrap transition-colors ${activeTab === 'projects'
                                    ? 'border-b-2 border-[#f78166] text-[#c9d1d9]'
                                    : 'hover:bg-[#161b22] rounded-t-md text-[#8b949e]'
                                }`}
                        >
                            <FolderKanban size={16} /> Projects
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'overview' && renderOverviewTab()}
                    {activeTab === 'repositories' && renderRepositoriesTab()}
                    {activeTab === 'projects' && renderProjectsTab()}
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
