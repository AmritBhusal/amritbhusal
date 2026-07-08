'use client';

import React, { useState } from 'react';
import { Book, Package, Mail } from 'lucide-react';
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
        <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-8 text-[#ebdbb2]">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Left Sidebar - Profile Info */}
                <div className="md:sticky md:top-4 md:self-start">
                    <ProfileSidebar />
                </div>

                {/* Right Content - Tabs and Content */}
                <div className="flex-1 min-w-0">
                    {/* Tabs */}
                    <div className="flex items-center gap-4 border-b border-[#3a3128] mb-4 overflow-x-auto no-scrollbar">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex items-center gap-2 px-4 py-2 font-semibold cursor-pointer whitespace-nowrap transition-colors ${activeTab === 'overview'
                                ? 'border-b-2 border-[#1793d1] text-[#ebdbb2]'
                                : 'hover:bg-[#221d17] rounded-t-md text-[#a89984]'
                                }`}
                        >
                            <Book size={16} /> Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('repositories')}
                            className={`flex items-center gap-2 px-4 py-2 font-semibold cursor-pointer whitespace-nowrap transition-colors ${activeTab === 'repositories'
                                ? 'border-b-2 border-[#1793d1] text-[#ebdbb2]'
                                : 'hover:bg-[#221d17] rounded-t-md text-[#a89984]'
                                }`}
                        >
                            <Package size={16} /> Repositories
                            <span className="text-xs bg-[#2b241b] px-2 rounded-full text-[#a89984]">{totalRepos}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`flex items-center gap-2 px-4 py-2 font-semibold cursor-pointer whitespace-nowrap transition-colors ${activeTab === 'projects'
                                ? 'border-b-2 border-[#1793d1] text-[#ebdbb2]'
                                : 'hover:bg-[#221d17] rounded-t-md text-[#a89984]'
                                }`}
                        >
                            <Mail size={16} /> Contact
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
