'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FolderKanban, LogOut } from 'lucide-react';
import portfolioData from '@/components/Portfolio/portfolio.json';
import { Project } from '@/components/Intro/types';
import ProjectForm from '@/components/Admin/ProjectForm';
import { useAuth } from '@/components/Admin/AuthContext';

const CreateProjectPage = () => {
    const router = useRouter();
    const { logout } = useAuth();
    const projects: Project[] = portfolioData as Project[];
    const nextId = String(Math.max(...projects.map(p => Number(p.id))) + 1);

    const handleSave = (project: Project) => {
        console.log('Created project:', project);
        router.push('/admin?tab=projects');
    };

    const handleCancel = () => {
        router.push('/admin?tab=projects');
    };

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    return (
        <div className="w-full min-h-screen bg-[#0d1117]">
            <div className="sticky top-0 z-10 bg-[#161b22] border-b border-[#30363d] backdrop-blur-md bg-opacity-80">
                <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FolderKanban size={20} className="text-[#58a6ff]" />
                        <span className="text-sm font-semibold text-[#e6edf3]">Portfolio Admin</span>
                        <span className="text-xs text-[#484f58]">•</span>
                        <span className="text-xs text-[#8b949e]">New Project</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#8b949e] hover:text-[#f85149] hover:bg-[#f85149]/10 rounded-md transition-all"
                    >
                        <LogOut size={14} />
                        Sign out
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <ProjectForm
                    onSave={handleSave}
                    onCancel={handleCancel}
                    nextId={nextId}
                />
            </div>
        </div>
    );
};

export default CreateProjectPage;
