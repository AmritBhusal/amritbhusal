'use client';

import React, { useState, useEffect } from 'react';
import { Book, GitBranch, Pin } from 'lucide-react';
import Link from 'next/link';
import portfolioData from '../Portfolio/portfolio.json';
import { Project, getLanguageColor, getLanguageName } from './types';
import PinDialog from './PinDialog';

const DEFAULT_PINNED_IDS = ['20', '19', '18', '16'];

const PinnedProjects = () => {
    const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
    const [pinnedIds, setPinnedIds] = useState<string[]>([]);

    const projects: Project[] = portfolioData as Project[];
    const sortedProjects = [...projects].sort((a, b) => Number(b.id) - Number(a.id));

    // Load pinned projects from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('pinnedProjects');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setPinnedIds(parsed);
            } catch {
                setPinnedIds(DEFAULT_PINNED_IDS);
            }
        } else {
            setPinnedIds(DEFAULT_PINNED_IDS);
        }
    }, []);

    // Get pinned projects based on saved IDs
    const pinnedProjects = pinnedIds
        .map(id => projects.find(p => p.id === id))
        .filter((p): p is Project => p !== undefined);

    const handleOpenPinDialog = () => {
        setIsPinDialogOpen(true);
    };

    const handleSavePins = (newPinnedIds: string[]) => {
        setPinnedIds(newPinnedIds);
        localStorage.setItem('pinnedProjects', JSON.stringify(newPinnedIds));
    };

    return (
        <>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[16px] font-semibold text-[#ebdbb2]">Pinned</h2>
                    <button
                        onClick={handleOpenPinDialog}
                        className="text-xs text-[#1793d1] cursor-pointer hover:underline flex items-center gap-1"
                    >
                        <Pin size={12} />
                        Customize your pins
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pinnedProjects.map((project) => (
                        <Link href={`/detail/${project.id}`} key={project.id} className="border border-[#3a3128] rounded-md p-4 bg-[#1b1712] flex flex-col gap-2 hover:border-[#a89984] transition-colors">
                            <div className="flex items-center gap-2 text-[#1793d1] font-semibold">
                                <Book size={16} className="text-[#a89984]" />
                                <span className="hover:underline">
                                    {project.name.toLowerCase().replace(/\s+/g, '-').substring(0, 25)}
                                </span>
                                <span className="border border-[#3a3128] rounded-full px-2 text-[10px] text-[#a89984] font-medium">
                                    {project.type === 'client' ? 'Private' : 'Public'}
                                </span>
                            </div>
                            <p className="text-xs text-[#a89984] line-clamp-2">{project.details}</p>
                            <div className="flex items-center gap-4 mt-auto pt-2 text-xs text-[#a89984]">
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor(project) }}></span>
                                    {getLanguageName(project)}
                                </div>
                                <div className="flex items-center gap-1"><GitBranch size={12} /> {(Number(project.id) % 5) + 1}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <PinDialog
                isOpen={isPinDialogOpen}
                onOpenChange={setIsPinDialogOpen}
                pinnedIds={pinnedIds}
                sortedProjects={sortedProjects}
                onSavePins={handleSavePins}
            />
        </>
    );
};

export default PinnedProjects;
