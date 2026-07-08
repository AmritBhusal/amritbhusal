'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FolderKanban, LogOut } from 'lucide-react';
import blogsData from '@/components/Admin/blogs.json';
import { BlogPost } from '@/components/Admin/blogTypes';
import BlogForm from '@/components/Admin/BlogForm';
import { useAuth } from '@/components/Admin/AuthContext';

const EditBlogPage = () => {
    const router = useRouter();
    const params = useParams();
    const { logout } = useAuth();
    const blogId = params.id as string;

    const blogs: BlogPost[] = blogsData as BlogPost[];
    const blog = blogs.find(b => b.id === blogId);
    const nextId = String(Math.max(...blogs.map(b => Number(b.id))) + 1);

    const handleSave = (updatedBlog: BlogPost) => {
        console.log('Updated blog:', updatedBlog);
        router.push('/admin?tab=blogs');
    };

    const handleCancel = () => {
        router.push('/admin?tab=blogs');
    };

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    if (!blog) {
        return (
            <div className="w-full min-h-screen bg-[#1b1712] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#fbf1c7] mb-2">Post Not Found</h1>
                    <p className="text-[#a89984] mb-6">No blog post exists with ID &quot;{blogId}&quot;</p>
                    <button
                        onClick={() => router.push('/admin?tab=blogs')}
                        className="px-4 py-2 bg-[#2b241b] text-[#1793d1] rounded-lg border border-[#3a3128] hover:bg-[#3a3128] transition-all text-sm font-medium"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#1b1712]">
            <div className="sticky top-0 z-10 bg-[#221d17] border-b border-[#3a3128] backdrop-blur-md bg-opacity-80">
                <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <FolderKanban size={20} className="text-[#1793d1]" />
                        <span className="text-sm font-semibold text-[#fbf1c7]">Portfolio Admin</span>
                        <span className="text-xs text-[#7c6f5a]">•</span>
                        <span className="text-xs text-[#a89984]">Editing: {blog.title}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-[#a89984] hover:text-[#f85149] hover:bg-[#f85149]/10 rounded-md transition-all"
                    >
                        <LogOut size={14} />
                        Sign out
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <BlogForm
                    blog={blog}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    nextId={nextId}
                />
            </div>
        </div>
    );
};

export default EditBlogPage;
