import React from 'react';
import { FaHtml5, FaCss3Alt, FaBootstrap, FaJs, FaReact, FaGitAlt, FaBitbucket, FaGithub, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMui, SiTypescript, SiLighthouse, SiFigma } from 'react-icons/si';
import { Rocket, ShoppingCart, Gauge, Paintbrush, Mail, Calendar, FolderKanban, Briefcase, TrendingUp, Users } from 'lucide-react';
import introData from './intro.json';
import aboutData from '../About/about.json';
import { TabType } from './types';
import PinnedProjects from './PinnedProjects';

interface OverviewTabProps {
    onNavigate: (tab: TabType) => void;
}

const skillCategories = [
    {
        title: 'Frontend Architecture',
        skills: [
            { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
            { name: 'React', icon: FaReact, color: '#61dafb' },
            { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
            { name: 'JavaScript', icon: FaJs, color: '#f7df1e' },
        ],
    },
    {
        title: 'UI & Styling',
        skills: [
            { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06b6d4' },
            { name: 'HTML5', icon: FaHtml5, color: '#e34f26' },
            { name: 'CSS3', icon: FaCss3Alt, color: '#1572b6' },
            { name: 'Bootstrap', icon: FaBootstrap, color: '#7952b3' },
            { name: 'Material UI', icon: SiMui, color: '#007fff' },
        ],
    },
    {
        title: 'Performance & SEO',
        skills: [
            { name: 'SSR / SSG', icon: SiNextdotjs, color: '#ffffff' },
            { name: 'Lighthouse', icon: SiLighthouse, color: '#f44b21' },
            { name: 'Figma to Code', icon: SiFigma, color: '#a259ff' },
        ],
    },
    {
        title: 'Team & Collaboration',
        skills: [
            { name: 'Git', icon: FaGitAlt, color: '#f05032' },
            { name: 'GitHub', icon: FaGithub, color: '#ffffff' },
            { name: 'Bitbucket', icon: FaBitbucket, color: '#0052cc' },
        ],
    },
];

const services = [
    {
        icon: Rocket,
        title: 'Startup MVP Development',
        description: 'Launch your product quickly with Next.js & React — from idea to production in weeks.',
    },
    {
        icon: ShoppingCart,
        title: 'eCommerce Development',
        description: 'Fast, conversion-optimized storefronts with seamless checkout and inventory management.',
    },
    {
        icon: Gauge,
        title: 'Frontend Performance Optimization',
        description: 'Improve Core Web Vitals, Lighthouse scores, and SEO for existing web applications.',
    },
    {
        icon: Paintbrush,
        title: 'Design to Code',
        description: 'Convert Figma designs into pixel-perfect, production-ready responsive interfaces.',
    },
];

const stats = [
    { value: '20+', label: 'Projects Delivered', icon: FolderKanban },
    { value: '3+', label: 'Years Experience', icon: Briefcase },
    { value: '10+', label: 'Business Clients', icon: Users },
    { value: '95+', label: 'Lighthouse Scores', icon: TrendingUp },
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
                            <span className="font-semibold text-[#58a6ff]">{introData.role}</span> — {introData.ctaDescription}
                        </p>

                        <p className="text-[#8b949e] text-sm">
                            {introData.tagline}
                        </p>

                        {/* Trust Line */}
                        <div className="flex items-center gap-2 py-2">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-full text-sm text-[#58a6ff] font-medium">
                                    {introData.trustLine}
                            </span>
                        </div>

                        <div className="py-4">
                            <h3 className="text-xl font-bold mb-3">About Me</h3>
                            <p className="text-[#8b949e] leading-relaxed">
                                {aboutData.description}
                            </p>
                        </div>

                        {/* Stats Section */}
                        <div className="py-4 border-t border-[#30363d]">
                            <h3 className="text-xl font-bold mb-4">📊 Impact & Numbers</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {stats.map((stat, index) => {
                                    const IconComponent = stat.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center gap-2 p-4 bg-[#161b22] border border-[#30363d] rounded-md hover:border-[#58a6ff] transition-colors"
                                        >
                                            <IconComponent size={20} className="text-[#58a6ff]" />
                                            <span className="text-2xl font-bold text-[#c9d1d9]">{stat.value}</span>
                                            <span className="text-xs text-[#8b949e] text-center">{stat.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Categorized Skills & Technologies */}
                        <div className="py-4 border-t border-[#30363d]">
                            <h3 className="text-xl font-bold mb-4">🛠️ Core Expertise</h3>
                            <div className="space-y-4">
                                {skillCategories.map((category, catIndex) => (
                                    <div key={catIndex}>
                                        <h4 className="text-sm font-semibold text-[#8b949e] mb-2 uppercase tracking-wider">{category.title}</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {category.skills.map((tech, index) => {
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
                                ))}
                            </div>
                        </div>

                        {/* Services Section */}
                        <div className="py-4 border-t border-[#30363d]">
                            <h3 className="text-xl font-bold mb-4">💼 Services I Offer</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {services.map((service, index) => {
                                    const IconComponent = service.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="p-4 bg-[#161b22] border border-[#30363d] rounded-md hover:border-[#58a6ff] transition-colors"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <IconComponent size={18} className="text-[#58a6ff]" />
                                                <h4 className="font-semibold text-[#c9d1d9]">{service.title}</h4>
                                            </div>
                                            <p className="text-sm text-[#8b949e]">{service.description}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-[#30363d]">
                            {/* <button
                                onClick={() => onNavigate('repositories')}
                                className="px-4 py-2 bg-[#238636] text-white rounded-md font-semibold text-sm hover:bg-[#2ea043] transition-colors border border-[rgba(240,246,252,0.1)]"
                            >
                                View Case Studies
                            </button> */}
                            <button
                                onClick={() => onNavigate('projects')}
                                className="px-4 py-2 bg-[#21262d] text-[#58a6ff] rounded-md font-semibold text-sm hover:bg-[#30363d] transition-colors border border-[#30363d]"
                            >
                                Hire Me
                            </button>
                            <a
                                href={introData.socialLinks.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-[#21262d] text-[#c9d1d9] rounded-md font-semibold text-sm hover:bg-[#30363d] transition-colors border border-[#30363d]"
                            >
                                <Calendar size={14} />
                                Book Discovery Call
                            </a>
                            <a
                                href={introData.resume}
                                download
                                className="px-4 py-2 bg-[#21262d] text-[#8b949e] rounded-md font-semibold text-sm hover:bg-[#30363d] transition-colors border border-[#30363d]"
                            >
                                Download Resume
                            </a>
                        </div>

                        {/* Quick Contact Links */}
                        <div className="flex items-center gap-3 pt-2">
                            <span className="text-xs text-[#8b949e]">Quick reach:</span>
                            <a href={introData.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[#8b949e] hover:text-[#25d366] transition-colors">
                                <FaWhatsapp size={16} />
                            </a>
                            <a href={introData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#8b949e] hover:text-[#0a66c2] transition-colors">
                                <FaLinkedin size={16} />
                            </a>
                            <a href="mailto:bhusalamrit41@gmail.com" className="text-[#8b949e] hover:text-[#58a6ff] transition-colors">
                                <Mail size={16} />
                            </a>
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
