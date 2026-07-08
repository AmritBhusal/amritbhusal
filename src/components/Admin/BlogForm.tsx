'use client';

import React, { useState, useRef } from 'react';
import { ArrowLeft, Plus, X, Save, Upload, FileText, Layout, Image as ImageIcon, Tag } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { BlogPost } from './blogTypes';

const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-[#1b1712] border border-[#3a3128] rounded-lg animate-pulse flex items-center justify-center text-[#7c6f5a]">Loading editor...</div>
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
                        className="p-2 text-[#a89984] hover:text-[#fbf1c7] hover:bg-[#2b241b] rounded-lg transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-[#fbf1c7]">
                            {isEditing ? 'Edit Post' : 'Create Post'}
                        </h1>
                        <p className="text-sm text-[#a89984] mt-0.5">
                            {isEditing ? `Editing "${formData.title}"` : 'Add a new blog post'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-[#a89984] cursor-pointer bg-[#2b241b] px-3 py-2 rounded-lg border border-[#3a3128] hover:border-[#7c6f5a] transition-all">
                        <input
                            type="checkbox"
                            checked={formData.isPublished}
                            onChange={(e) => updateField('isPublished', e.target.checked)}
                            className="rounded border-[#3a3128] bg-[#1b1712] text-[#238636] focus:ring-[#238636]/20"
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
            <div className="flex items-center gap-1 border-b border-[#3a3128] overflow-x-auto no-scrollbar pt-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'border-[#1793d1] text-[#fbf1c7]'
                                : 'border-transparent text-[#a89984] hover:text-[#fbf1c7] hover:border-[#7c6f5a]'
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
                                <label className="text-sm font-medium text-[#fbf1c7]">Title <span className="text-[#f85149]">*</span></label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => updateField('title', e.target.value)}
                                    placeholder="e.g. Building Modern Portfolios"
                                    required
                                    className="w-full px-3 py-2.5 bg-[#1b1712] border border-[#2b241b] rounded-lg text-[#fbf1c7] text-sm placeholder-[#7c6f5a] focus:outline-none focus:border-[#1793d1] focus:ring-1 focus:ring-[#1793d1]/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#fbf1c7]">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => updateField('slug', e.target.value)}
                                    placeholder="building-modern-portfolios"
                                    className="w-full px-3 py-2.5 bg-[#1b1712] border border-[#2b241b] rounded-lg text-[#fbf1c7] text-sm font-mono placeholder-[#7c6f5a] focus:outline-none focus:border-[#1793d1] focus:ring-1 focus:ring-[#1793d1]/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#fbf1c7]">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => updateField('category', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-[#1b1712] border border-[#2b241b] rounded-lg text-[#fbf1c7] text-sm focus:outline-none focus:border-[#1793d1] focus:ring-1 focus:ring-[#1793d1]/20 transition-all"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#fbf1c7]">Author</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => updateField('author', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-[#1b1712] border border-[#2b241b] rounded-lg text-[#fbf1c7] text-sm placeholder-[#7c6f5a] focus:outline-none focus:border-[#1793d1] focus:ring-1 focus:ring-[#1793d1]/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#fbf1c7]">Publish Date</label>
                                <input
                                    type="date"
                                    value={formData.publishedAt}
                                    onChange={(e) => updateField('publishedAt', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-[#1b1712] border border-[#2b241b] rounded-lg text-[#fbf1c7] text-sm focus:outline-none focus:border-[#1793d1] focus:ring-1 focus:ring-[#1793d1]/20 transition-all"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#fbf1c7]">Excerpt <span className="text-[#f85149]">*</span></label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => updateField('excerpt', e.target.value)}
                                placeholder="A brief summary that appears in blog listings..."
                                rows={3}
                                required
                                className="w-full px-3 py-2.5 bg-[#1b1712] border border-[#2b241b] rounded-lg text-[#fbf1c7] text-sm placeholder-[#7c6f5a] focus:outline-none focus:border-[#1793d1] focus:ring-1 focus:ring-[#1793d1]/20 transition-all resize-none"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'content' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-[#fbf1c7]">Content <span className="text-[#f85149]">*</span></label>
                            <span className="text-xs text-[#a89984]">Supports Rich Text & Images</span>
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
                            <label className="text-sm font-medium text-[#fbf1c7]">Cover Image</label>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex-1 border-2 border-dashed border-[#3a3128] rounded-xl p-8 text-center cursor-pointer hover:border-[#1793d1]/50 hover:bg-[#1793d1]/5 transition-all group"
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <Upload size={32} className="mx-auto mb-3 text-[#7c6f5a] group-hover:text-[#1793d1] transition-colors" />
                                    <p className="text-sm text-[#fbf1c7] font-medium">Click to upload cover image</p>
                                    <p className="text-xs text-[#a89984] mt-1">PNG, JPG, WebP up to 5MB</p>
                                </div>

                                {imagePreview && (
                                    <div className="relative w-full md:w-80 h-48 rounded-xl overflow-hidden border border-[#3a3128] bg-[#1b1712] flex-shrink-0 group">
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
                        <div className="space-y-4 pt-6 border-t border-[#3a3128]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-medium text-[#fbf1c7]">Post Tags</label>
                                    <p className="text-xs text-[#a89984] mt-0.5">Add relevant tags to help users find your content</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={addTag}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2b241b] text-xs text-[#1793d1] hover:text-[#79c0ff] rounded-lg border border-[#3a3128] transition-all"
                                >
                                    <Plus size={14} />
                                    Add Tag
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-3 p-4 bg-[#1b1712] rounded-xl border border-[#2b241b]">
                                {formData.tags.map((tag, index) => (
                                    <div key={index} className="flex items-center gap-2 group bg-[#221d17] border border-[#3a3128] rounded-lg px-2 py-1.5 focus-within:border-[#1793d1] transition-all">
                                        <input
                                            type="text"
                                            value={tag}
                                            onChange={(e) => updateTag(index, e.target.value)}
                                            placeholder="Tag name"
                                            className="w-24 bg-transparent text-[#fbf1c7] text-xs focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeTag(index)}
                                            className="text-[#7c6f5a] hover:text-[#f85149] transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                {formData.tags.length === 0 && (
                                    <p className="text-xs text-[#7c6f5a] italic py-1">No tags added yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Actions - Fixed on Mobile or separate from tabs */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#3a3128]">
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-[#a89984] hover:text-[#fbf1c7] bg-[#2b241b] hover:bg-[#3a3128] border border-[#3a3128] rounded-lg transition-all"
                >
                    Cancel
                </button>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {activeTab !== 'media' ? (
                        <button
                            type="button"
                            onClick={() => setActiveTab(activeTab === 'details' ? 'content' : 'media')}
                            className="w-full sm:w-auto px-6 py-2.5 bg-[#2b241b] text-[#fbf1c7] text-sm font-semibold rounded-lg border border-[#3a3128] hover:bg-[#3a3128] transition-all"
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

