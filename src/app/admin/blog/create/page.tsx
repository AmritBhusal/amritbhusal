'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FolderKanban, LogOut } from 'lucide-react';
import blogsData from '@/components/Admin/blogs.json';
import { BlogPost } from '@/components/Admin/blogTypes';
import BlogForm from '@/components/Admin/BlogForm';
import { useAuth } from '@/components/Admin/AuthContext';

const CreateBlogPage = () => {
    const router = useRouter();
    const { logout } = useAuth();
    const blogs: BlogPost[] = blogsData as BlogPost[];
    const nextId = String(Math.max(...blogs.map(b => Number(b.id))) + 1);

    const handleSave = (blog: BlogPost) => {
        console.log('Created blog:', blog);
        router.push('/admin?tab=blogs');
    };

    const handleCancel = () => {
        router.push('/admin?tab=blogs');
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
                        <span className="text-xs text-[#8b949e]">New Blog Post</span>
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
                <BlogForm
                    onSave={handleSave}
                    onCancel={handleCancel}
                    nextId={nextId}
                />
            </div>
        </div>
    );
};

export default CreateBlogPage;
