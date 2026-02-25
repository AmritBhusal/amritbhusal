'use client';

import React, { useState } from 'react';
import { Book, Package, FolderKanban } from 'lucide-react';
import portfolioData from '../Portfolio/portfolio.json';
import { TabType } from './types';
import ProfileSidebar from './ProfileSidebar';
import OverviewTab from './OverviewTab';
import RepositoriesTab from './RepositoriesTab';
import ContactTab from './ContactTab';

const ProfileSection = () => {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const totalRepos = portfolioData.length;

    return (
        <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-8 text-[#c9d1d9]">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Left Sidebar - Profile Info */}
                <ProfileSidebar />

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
                    {activeTab === 'overview' && <OverviewTab onNavigate={setActiveTab} />}
                    {activeTab === 'repositories' && <RepositoriesTab />}
                    {activeTab === 'projects' && <ContactTab />}
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
