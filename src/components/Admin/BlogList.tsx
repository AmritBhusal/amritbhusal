'use client';

import React from 'react';
import { Search, Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { BlogPost } from './blogTypes';

interface BlogListProps {
    blogs: BlogPost[];
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onCreateNew: () => void;
    onEdit: (blog: BlogPost) => void;
    onDelete: (blogId: string) => void;
}

const BlogList: React.FC<BlogListProps> = ({
    blogs,
    searchQuery,
    onSearchChange,
    onCreateNew,
    onEdit,
    onDelete,
}) => {
    const filteredBlogs = searchQuery
        ? blogs.filter(b =>
            b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : blogs;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#fbf1c7]">Blog Posts</h1>
                    <p className="text-sm text-[#a89984] mt-1">{blogs.length} posts total</p>
                </div>
                <button
                    onClick={onCreateNew}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#238636]/20"
                >
                    <Plus size={16} />
                    New Post
                </button>
            </div>

            <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c6f5a]" />
                <input
                    type="text"
                    placeholder="Search posts by title, category, or tags..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-[#221d17] border border-[#3a3128] rounded-lg text-[#fbf1c7] text-sm placeholder-[#7c6f5a] focus:outline-none focus:border-[#1793d1] focus:ring-1 focus:ring-[#1793d1]/30 transition-all"
                />
            </div>

            <div className="border border-[#3a3128] rounded-lg overflow-hidden bg-[#1b1712]">
                <div className="hidden md:grid grid-cols-[1fr_120px_120px_80px_100px] gap-4 px-5 py-3 bg-[#221d17] border-b border-[#3a3128] text-xs font-semibold text-[#a89984] uppercase tracking-wider">
                    <span>Post</span>
                    <span>Category</span>
                    <span>Date</span>
                    <span>Status</span>
                    <span className="text-right">Actions</span>
                </div>

                {filteredBlogs.length === 0 ? (
                    <div className="py-16 text-center text-[#7c6f5a]">
                        <p className="text-lg">No posts found</p>
                        <p className="text-sm mt-1">Try a different search term</p>
                    </div>
                ) : (
                    <div className="divide-y divide-[#2b241b]">
                        {filteredBlogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="group grid grid-cols-1 md:grid-cols-[1fr_120px_120px_80px_100px] gap-3 md:gap-4 px-5 py-4 hover:bg-[#221d17]/60 transition-colors"
                            >
                                <div className="min-w-0">
                                    <h3 className="text-[#1793d1] font-semibold truncate">{blog.title}</h3>
                                    <p className="text-xs text-[#a89984] line-clamp-1 mt-0.5">{blog.excerpt}</p>
                                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                                        {blog.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-[10px] px-2 py-0.5 bg-[#2b241b] text-[#a89984] rounded-full border border-[#3a3128]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <span className="text-xs text-[#a89984] bg-[#2b241b] px-2.5 py-1 rounded-full border border-[#3a3128]">
                                        {blog.category}
                                    </span>
                                </div>

                                <div className="flex items-center">
                                    <span className="text-xs text-[#a89984]">
                                        {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>

                                <div className="flex items-center">
                                    {blog.isPublished ? (
                                        <span className="flex items-center gap-1 text-xs text-[#3fb950]">
                                            <Eye size={12} />
                                            Live
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-xs text-[#a89984]">
                                            <EyeOff size={12} />
                                            Draft
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-1">
                                    <button
                                        onClick={() => onEdit(blog)}
                                        className="p-2 text-[#7c6f5a] hover:text-[#fbf1c7] hover:bg-[#2b241b] rounded-md transition-all"
                                        title="Edit"
                                    >
                                        <Pencil size={15} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(blog.id)}
                                        className="p-2 text-[#7c6f5a] hover:text-[#f85149] hover:bg-[#f85149]/10 rounded-md transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogList;
