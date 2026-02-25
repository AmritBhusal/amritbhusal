'use client';

import React, { useState } from 'react';
import { Search, Book, GitBranch } from 'lucide-react';
import Link from 'next/link';
import portfolioData from '../Portfolio/portfolio.json';
import { Project, getLanguageColor, getLanguageName } from './types';

const RepositoriesTab = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const projects: Project[] = portfolioData as Project[];
    const sortedProjects = [...projects].sort((a, b) => Number(b.id) - Number(a.id));

    const filteredRepos = searchQuery
        ? sortedProjects.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.details.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : sortedProjects;

    return (
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
                                    <Link
                                        href={`/detail/${project.id}`}
                                        className="text-[#58a6ff] font-semibold hover:underline text-lg"
                                    >
                                        {project.name}
                                    </Link>
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
                                    <div className="flex items-center gap-1"><GitBranch size={12} /> {(Number(project.id) % 5) + 1}</div>
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
                    <p>No repositories found matching &quot;{searchQuery}&quot;</p>
                </div>
            )}
        </div>
    );
};

export default RepositoriesTab;
