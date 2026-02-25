'use client';

import React, { useState, useRef } from 'react';
import { ArrowLeft, Plus, X, Save, Upload, FileText, Layout, Image as ImageIcon, Tag } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { BlogPost } from './blogTypes';

const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-[#0d1117] border border-[#30363d] rounded-lg animate-pulse flex items-center justify-center text-[#484f58]">Loading editor...</div>
});

interface BlogFormProps {
    blog?: BlogPost | null;
    onSave: (blog: BlogPost) => void;
    onCancel: () => void;
    nextId: string;
}

const EMPTY_BLOG: BlogPost = {
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'Development',
    tags: [''],
    author: 'Amrit Bhusal',
    publishedAt: new Date().toISOString().split('T')[0],
    isPublished: false,
};

const CATEGORIES = ['Development', 'TypeScript', 'React', 'Next.js', 'Career', 'Design', 'Tutorial', 'Other'];

type TabType = 'details' | 'content' | 'media';

const BlogForm: React.FC<BlogFormProps> = ({ blog, onSave, onCancel, nextId }) => {
    const isEditing = !!blog;
    const [activeTab, setActiveTab] = useState<TabType>('details');
    const [formData, setFormData] = useState<BlogPost>(() => {
        if (blog) return { ...blog };
        return { ...EMPTY_BLOG, id: nextId };
    });
    const [imagePreview, setImagePreview] = useState<string | null>(blog?.coverImage || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateField = (field: keyof BlogPost, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }) as BlogPost);
        if (field === 'title' && !isEditing) {
            const slug = (value as string)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, [field]: value, slug }) as BlogPost);
        }
    };

    const updateTag = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.map((t, i) => i === index ? value : t),
        }));
    };

    const addTag = () => {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, ''] }));
    };

    const removeTag = (index: number) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index),
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            setImagePreview(result);
            const fileName = file.name.toLowerCase().replace(/\s+/g, '-');
            updateField('coverImage', `/blog/${fileName}`);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        updateField('coverImage', '');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cleaned: BlogPost = {
            ...formData,
            tags: formData.tags.filter(t => t.trim() !== ''),
        };
        onSave(cleaned);
    };

    const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
        { id: 'details', label: 'Details', icon: <Layout size={16} /> },
        { id: 'content', label: 'Content', icon: <FileText size={16} /> },
        { id: 'media', label: 'Media & Tags', icon: <Tag size={16} /> },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="p-2 text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] rounded-lg transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-[#e6edf3]">
                            {isEditing ? 'Edit Post' : 'Create Post'}
                        </h1>
                        <p className="text-sm text-[#8b949e] mt-0.5">
                            {isEditing ? `Editing "${formData.title}"` : 'Add a new blog post'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-[#8b949e] cursor-pointer bg-[#21262d] px-3 py-2 rounded-lg border border-[#30363d] hover:border-[#484f58] transition-all">
                        <input
                            type="checkbox"
                            checked={formData.isPublished}
                            onChange={(e) => updateField('isPublished', e.target.checked)}
                            className="rounded border-[#30363d] bg-[#0d1117] text-[#238636] focus:ring-[#238636]/20"
                        />
                        <span>Publish Status</span>
                    </label>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#238636]/20"
                    >
                        <Save size={16} />
                        {isEditing ? 'Save Changes' : 'Create Post'}
                    </button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 border-b border-[#30363d] overflow-x-auto no-scrollbar pt-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'border-[#f78166] text-[#e6edf3]'
                                : 'border-transparent text-[#8b949e] hover:text-[#e6edf3] hover:border-[#484f58]'
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Form Content */}
            <div className="min-h-[500px]">
                {activeTab === 'details' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#e6edf3]">Title <span className="text-[#f85149]">*</span></label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => updateField('title', e.target.value)}
                                    placeholder="e.g. Building Modern Portfolios"
                                    required
                                    className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#e6edf3]">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => updateField('slug', e.target.value)}
                                    placeholder="building-modern-portfolios"
                                    className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm font-mono placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#e6edf3]">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => updateField('category', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#e6edf3]">Author</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => updateField('author', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#e6edf3]">Publish Date</label>
                                <input
                                    type="date"
                                    value={formData.publishedAt}
                                    onChange={(e) => updateField('publishedAt', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#e6edf3]">Excerpt <span className="text-[#f85149]">*</span></label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => updateField('excerpt', e.target.value)}
                                placeholder="A brief summary that appears in blog listings..."
                                rows={3}
                                required
                                className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all resize-none"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-[#e6edf3]">Content <span className="text-[#f85149]">*</span></label>
                            <span className="text-xs text-[#8b949e]">Supports Rich Text & Images</span>
                        </div>
                        <RichTextEditor
                            content={formData.content}
                            onChange={(content) => updateField('content', content)}
                            placeholder="Write your amazing story here..."
                        />
                    </div>
                )}

                {activeTab === 'media' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* Cover Image */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-[#e6edf3]">Cover Image</label>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex-1 border-2 border-dashed border-[#30363d] rounded-xl p-8 text-center cursor-pointer hover:border-[#58a6ff]/50 hover:bg-[#58a6ff]/5 transition-all group"
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <Upload size={32} className="mx-auto mb-3 text-[#484f58] group-hover:text-[#58a6ff] transition-colors" />
                                    <p className="text-sm text-[#e6edf3] font-medium">Click to upload cover image</p>
                                    <p className="text-xs text-[#8b949e] mt-1">PNG, JPG, WebP up to 5MB</p>
                                </div>

                                {imagePreview && (
                                    <div className="relative w-full md:w-80 h-48 rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] flex-shrink-0 group">
                                        <Image src={imagePreview} alt="Cover preview" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="p-2 bg-[#f85149] text-white rounded-lg hover:bg-[#da3633] transition-all shadow-lg"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="space-y-4 pt-6 border-t border-[#30363d]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-[#e6edf3]">Post Tags</label>
                                    <p className="text-xs text-[#8b949e] mt-0.5">Add relevant tags to help users find your content</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#21262d] text-xs text-[#58a6ff] hover:text-[#79c0ff] rounded-lg border border-[#30363d] transition-all"
                                >
                                    <Plus size={14} />
                                    Add Tag
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-3 p-4 bg-[#0d1117] rounded-xl border border-[#21262d]">
                                {formData.tags.map((tag, index) => (
                                    <div key={index} className="flex items-center gap-2 group bg-[#161b22] border border-[#30363d] rounded-lg px-2 py-1.5 focus-within:border-[#58a6ff] transition-all">
                                        <input
                                            type="text"
                                            value={tag}
                                            onChange={(e) => updateTag(index, e.target.value)}
                                            placeholder="Tag name"
                                            className="w-24 bg-transparent text-[#e6edf3] text-xs focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeTag(index)}
                                            className="text-[#484f58] hover:text-[#f85149] transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                {formData.tags.length === 0 && (
                                    <p className="text-xs text-[#484f58] italic py-1">No tags added yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Actions - Fixed on Mobile or separate from tabs */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#30363d]">
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-[#8b949e] hover:text-[#e6edf3] bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-lg transition-all"
                >
                    Cancel
                </button>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {activeTab !== 'media' ? (
                        <button
                            type="button"
                            onClick={() => setActiveTab(activeTab === 'details' ? 'content' : 'media')}
                            className="w-full sm:w-auto px-6 py-2.5 bg-[#21262d] text-[#e6edf3] text-sm font-semibold rounded-lg border border-[#30363d] hover:bg-[#30363d] transition-all"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#238636]/20"
                        >
                            <Save size={16} />
                            {isEditing ? 'Save Changes' : 'Publish Post'}
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default BlogForm;

