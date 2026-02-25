'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { FolderKanban, LogOut, Layers, FileText, AlertTriangle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import portfolioData from '@/components/Portfolio/portfolio.json';
import blogsData from '@/components/Admin/blogs.json';
import { Project } from '@/components/Intro/types';
import { BlogPost } from '@/components/Admin/blogTypes';
import ProjectList from '@/components/Admin/ProjectList';
import BlogList from '@/components/Admin/BlogList';
import { useAuth } from '@/components/Admin/AuthContext';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';

type AdminTab = 'projects' | 'blogs';

const DashboardContent = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const initialTab = (searchParams.get('tab') as AdminTab) || 'projects';

    const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
    const [projects, setProjects] = useState<Project[]>(portfolioData as Project[]);
    const [blogs, setBlogs] = useState<BlogPost[]>(blogsData as BlogPost[]);
    const [projectSearch, setProjectSearch] = useState('');
    const [blogSearch, setBlogSearch] = useState('');
    const [deleteTarget, setDeleteTarget] = useState<{ id: string; type: 'project' | 'blog' } | null>(null);
    const { logout } = useAuth();

    // Sync tab state with URL without triggering a full reload
    const handleTabChange = (tab: AdminTab) => {
        setActiveTab(tab);
        router.push(`/admin?tab=${tab}`, { scroll: false });
    };

    const sortedProjects = [...projects].sort((a, b) => Number(b.id) - Number(a.id));

    const handleReorder = (reordered: Project[]) => {
        setProjects(reordered);
    };

    const handleDeleteRequest = (id: string, type: 'project' | 'blog') => {
        setDeleteTarget({ id, type });
    };

    const handleConfirmDelete = () => {
        if (!deleteTarget) return;
        if (deleteTarget.type === 'project') {
            setProjects(prev => prev.filter(p => p.id !== deleteTarget.id));
        } else {
            setBlogs(prev => prev.filter(b => b.id !== deleteTarget.id));
        }
        setDeleteTarget(null);
    };

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    const deleteName = deleteTarget
        ? deleteTarget.type === 'project'
            ? projects.find(p => p.id === deleteTarget.id)?.name ?? 'this project'
            : blogs.find(b => b.id === deleteTarget.id)?.title ?? 'this post'
        : '';

    return (
        <div className="w-full min-h-screen bg-[#0d1117]">
            {/* Top Nav */}
            <div className="sticky top-0 z-10 bg-[#161b22] border-b border-[#30363d] backdrop-blur-md bg-opacity-80">
                <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FolderKanban size={20} className="text-[#58a6ff]" />
                        <span className="text-sm font-semibold text-[#e6edf3]">Portfolio Admin</span>
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

            {/* Tab Navigation */}
            <div className="border-b border-[#30363d] bg-[#0d1117]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex gap-1">
                        <button
                            onClick={() => handleTabChange('projects')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === 'projects'
                                ? 'text-[#e6edf3] border-[#f78166]'
                                : 'text-[#8b949e] border-transparent hover:text-[#e6edf3] hover:border-[#30363d]'
                                }`}
                        >
                            <Layers size={16} />
                            Projects
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#21262d] border border-[#30363d]">{projects.length}</span>
                        </button>
                        <button
                            onClick={() => handleTabChange('blogs')}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${activeTab === 'blogs'
                                ? 'text-[#e6edf3] border-[#f78166]'
                                : 'text-[#8b949e] border-transparent hover:text-[#e6edf3] hover:border-[#30363d]'
                                }`}
                        >
                            <FileText size={16} />
                            Blogs
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#21262d] border border-[#30363d]">{blogs.length}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                {activeTab === 'projects' && (
                    <ProjectList
                        projects={sortedProjects}
                        searchQuery={projectSearch}
                        onSearchChange={setProjectSearch}
                        onCreateNew={() => router.push('/admin/project/create')}
                        onEdit={(p) => router.push(`/admin/project/${p.id}`)}
                        onDelete={(id) => handleDeleteRequest(id, 'project')}
                        onReorder={handleReorder}
                    />
                )}

                {activeTab === 'blogs' && (
                    <BlogList
                        blogs={blogs}
                        searchQuery={blogSearch}
                        onSearchChange={setBlogSearch}
                        onCreateNew={() => router.push('/admin/blog/create')}
                        onEdit={(b) => router.push(`/admin/blog/${b.id}`)}
                        onDelete={(id) => handleDeleteRequest(id, 'blog')}
                    />
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteTarget} onOpenChange={(open: boolean) => !open && setDeleteTarget(null)}>
                <DialogContent className="bg-[#161b22] border-[#30363d] text-[#e6edf3] max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-[#e6edf3] flex items-center gap-2">
                            <AlertTriangle size={20} className="text-[#f85149]" />
                            Delete {deleteTarget?.type === 'project' ? 'Project' : 'Post'}
                        </DialogTitle>
                        <DialogDescription className="text-[#8b949e]">
                            Are you sure you want to delete <strong className="text-[#e6edf3]">{deleteName}</strong>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2 pt-4">
                        <button
                            onClick={() => setDeleteTarget(null)}
                            className="px-4 py-2 text-sm font-medium text-[#8b949e] hover:text-[#e6edf3] bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-lg transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 text-sm font-semibold text-white bg-[#da3633] hover:bg-[#f85149] rounded-lg transition-all"
                        >
                            Delete
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const AdminDashboard = () => (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-[#8b949e]">Loading...</div>}>
        <DashboardContent />
    </Suspense>
);

export default AdminDashboard;
