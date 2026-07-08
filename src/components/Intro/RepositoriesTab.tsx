'use client';

import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import portfolioData from '../Portfolio/portfolio.json';
import { Project, getLanguageColor, getLanguageName } from './types';

const RepositoriesTab = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [langFilter, setLangFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    const projects: Project[] = portfolioData as Project[];

    // Language options derived from the actual data, not a hardcoded list.
    const languages = useMemo(
        () => Array.from(new Set(projects.map((p) => getLanguageName(p)))).sort(),
        [projects]
    );

    const filteredRepos = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return projects
            .filter((p) => {
                const matchesSearch =
                    !q ||
                    p.name.toLowerCase().includes(q) ||
                    p.details.toLowerCase().includes(q);
                const visibility = p.type === 'client' ? 'private' : 'public';
                const matchesType = typeFilter === 'all' || visibility === typeFilter;
                const matchesLang = langFilter === 'all' || getLanguageName(p) === langFilter;
                return matchesSearch && matchesType && matchesLang;
            })
            .sort((a, b) =>
                sortBy === 'name'
                    ? a.name.localeCompare(b.name)
                    : Number(b.id) - Number(a.id)
            );
    }, [projects, searchQuery, typeFilter, langFilter, sortBy]);

    const selectClass =
        'px-3 py-2 bg-[#2b241b] border border-[#3a3128] rounded-md text-[#ebdbb2] text-sm focus:outline-none focus:border-[#1793d1]';

    return (
        <div className="w-full">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a89984]" />
                    <input
                        type="text"
                        placeholder="Find a project..."
                        aria-label="Search projects"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#1b1712] border border-[#3a3128] rounded-md text-[#ebdbb2] text-sm focus:outline-none focus:border-[#1793d1] placeholder-[#a89984]"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        aria-label="Filter by type"
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className={selectClass}
                    >
                        <option value="all">All types</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    <select
                        aria-label="Filter by language"
                        value={langFilter}
                        onChange={(e) => setLangFilter(e.target.value)}
                        className={selectClass}
                    >
                        <option value="all">All languages</option>
                        {languages.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                    <select
                        aria-label="Sort projects"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={selectClass}
                    >
                        <option value="newest">Newest</option>
                        <option value="name">Name</option>
                    </select>
                </div>
            </div>

            {/* Repository List */}
            <div className="border border-[#3a3128] rounded-md divide-y divide-[#3a3128]">
                {filteredRepos.map((project) => (
                    <div key={project.id} className="p-4 hover:bg-[#221d17] transition-colors">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Link
                                        href={`/detail/${project.id}`}
                                        className="text-[#1793d1] font-semibold hover:underline text-lg"
                                    >
                                        {project.name}
                                    </Link>
                                    <span className="border border-[#3a3128] rounded-full px-2 py-0.5 text-[10px] text-[#a89984] font-medium">
                                        {project.type === 'client' ? 'Private' : 'Public'}
                                    </span>
                                </div>
                                <p className="text-[#a89984] text-sm mt-1 line-clamp-2">{project.details}</p>
                                <div className="flex items-center gap-4 mt-3 text-xs text-[#a89984]">
                                    <div className="flex items-center gap-1">
                                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor(project) }}></span>
                                        {getLanguageName(project)}
                                    </div>
                                    {project.role && <span>{project.role}</span>}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {project.demoUrl !== '#' && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 text-xs bg-[#2b241b] border border-[#3a3128] rounded-md text-[#ebdbb2] hover:bg-[#3a3128] transition-colors"
                                    >
                                        Demo
                                    </a>
                                )}
                                {project.codeUrl !== '#' && (
                                    <a
                                        href={project.codeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 text-xs bg-[#2b241b] border border-[#3a3128] rounded-md text-[#ebdbb2] hover:bg-[#3a3128] transition-colors"
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
                <div className="text-center py-12 text-[#a89984]">
                    <p>No projects found matching your filters.</p>
                </div>
            )}
        </div>
    );
};

export default RepositoriesTab;
