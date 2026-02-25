'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FolderKanban, LogOut } from 'lucide-react';
import portfolioData from '@/components/Portfolio/portfolio.json';
import { Project } from '@/components/Intro/types';
import ProjectForm from '@/components/Admin/ProjectForm';
import { useAuth } from '@/components/Admin/AuthContext';

const EditProjectPage = () => {
    const router = useRouter();
    const params = useParams();
    const { logout } = useAuth();
    const projectId = params.id as string;

    const projects: Project[] = portfolioData as Project[];
    const project = projects.find(p => p.id === projectId);
    const nextId = String(Math.max(...projects.map(p => Number(p.id))) + 1);

    const handleSave = (updatedProject: Project) => {
        console.log('Updated project:', updatedProject);
        router.push('/admin?tab=projects');
    };

    const handleCancel = () => {
        router.push('/admin?tab=projects');
    };

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    if (!project) {
        return (
            <div className="w-full min-h-screen bg-[#0d1117] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#e6edf3] mb-2">Project Not Found</h1>
                    <p className="text-[#8b949e] mb-6">No project exists with ID &quot;{projectId}&quot;</p>
                    <button
                        onClick={() => router.push('/admin?tab=projects')}
                        className="px-4 py-2 bg-[#21262d] text-[#58a6ff] rounded-lg border border-[#30363d] hover:bg-[#30363d] transition-all text-sm font-medium"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#0d1117]">
            <div className="sticky top-0 z-10 bg-[#161b22] border-b border-[#30363d] backdrop-blur-md bg-opacity-80">
                <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FolderKanban size={20} className="text-[#58a6ff]" />
                        <span className="text-sm font-semibold text-[#e6edf3]">Portfolio Admin</span>
                        <span className="text-xs text-[#484f58]">•</span>
                        <span className="text-xs text-[#8b949e]">Editing: {project.name}</span>
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
                    project={project}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    nextId={nextId}
                />
            </div>
        </div>
    );
};

export default EditProjectPage;
