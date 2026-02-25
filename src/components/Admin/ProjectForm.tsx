'use client';

import React, { useState, useRef } from 'react';
import { ArrowLeft, Plus, X, Save, Upload, Info, FileText, List as ListIcon, Image as ImageIcon, Terminal, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { Project } from '../Intro/types';

interface ProjectFormProps {
    project?: Project | null;
    onSave: (project: Project) => void;
    onCancel: () => void;
    nextId: string;
}

const EMPTY_PROJECT: Project = {
    id: '',
    type: 'Personal',
    name: '',
    image: '',
    demoUrl: '#',
    details: '',
    codeUrl: '#',
    role: 'Frontend Developer',
    description: '',
    technicalDetails: [''],
    keyFeatures: [''],
    challenges: [''],
};

type TabType = 'info' | 'description' | 'implementation' | 'features' | 'challenges';

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave, onCancel, nextId }) => {
    const isEditing = !!project;
    const [activeTab, setActiveTab] = useState<TabType>('info');
    const [formData, setFormData] = useState<Project>(() => {
        if (project) return { ...project };
        return { ...EMPTY_PROJECT, id: nextId };
    });
    const [imagePreview, setImagePreview] = useState<string | null>(project?.image || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateField = (field: keyof Project, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateArrayItem = (field: 'technicalDetails' | 'keyFeatures' | 'challenges', index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item),
        }));
    };

    const addArrayItem = (field: 'technicalDetails' | 'keyFeatures' | 'challenges') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], ''],
        }));
    };

    const removeArrayItem = (field: 'technicalDetails' | 'keyFeatures' | 'challenges', index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
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
            updateField('image', `/project/${fileName}`);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        updateField('image', '');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cleaned: Project = {
            ...formData,
            technicalDetails: formData.technicalDetails.filter(s => s.trim() !== ''),
            keyFeatures: formData.keyFeatures.filter(s => s.trim() !== ''),
            challenges: formData.challenges.filter(s => s.trim() !== ''),
        };
        onSave(cleaned);
    };

    const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
        { id: 'info', label: 'Basic Info', icon: <Info size={16} /> },
        { id: 'description', label: 'Description', icon: <FileText size={16} /> },
        { id: 'implementation', label: 'Technical', icon: <Terminal size={16} /> },
        { id: 'features', label: 'Features', icon: <ListIcon size={16} /> },
        { id: 'challenges', label: 'Challenges', icon: <AlertCircle size={16} /> },
    ];

    const renderArrayField = (
        label: string,
        field: 'technicalDetails' | 'keyFeatures' | 'challenges',
        placeholder: string,
        description: string
    ) => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-[#e6edf3]">{label}</h2>
                    <p className="text-sm text-[#8b949e] mt-0.5">{description}</p>
                </div>
                <button
                    type="button"
                    onClick={() => addArrayItem(field)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#21262d] text-xs text-[#58a6ff] hover:text-[#79c0ff] rounded-lg border border-[#30363d] transition-all"
                >
                    <Plus size={14} />
                    Add Item
                </button>
            </div>
            <div className="space-y-3 p-6 bg-[#0d1117] rounded-xl border border-[#21262d]">
                {formData[field].map((item, index) => (
                    <div key={index} className="flex gap-2 group bg-[#161b22] border border-[#30363d] rounded-lg p-1 pr-2 focus-within:border-[#58a6ff] transition-all">
                        <div className="flex items-center justify-center w-8 text-xs text-[#484f58] font-mono flex-shrink-0">
                            {index + 1}.
                        </div>
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => updateArrayItem(field, index, e.target.value)}
                            placeholder={placeholder}
                            className="flex-1 bg-transparent py-2.5 text-[#e6edf3] text-sm focus:outline-none placeholder-[#484f58]"
                        />
                        {formData[field].length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeArrayItem(field, index)}
                                className="p-1.5 text-[#484f58] hover:text-[#f85149] rounded-md transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

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
                            {isEditing ? 'Edit Project' : 'Create Project'}
                        </h1>
                        <p className="text-sm text-[#8b949e] mt-0.5">
                            {isEditing ? `Editing "${formData.name}"` : 'Add a new project to your portfolio'}
                        </p>
                    </div>
                </div>
                <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#238636]/20"
                >
                    <Save size={16} />
                    {isEditing ? 'Save Changes' : 'Create Project'}
                </button>
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
            <div className="min-h-[450px]">
                {activeTab === 'info' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#e6edf3]">Project Name <span className="text-[#f85149]">*</span></label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => updateField('name', e.target.value)}
                                    placeholder="e.g. My Awesome Project"
                                    required
                                    className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#e6edf3]">Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => updateField('type', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all"
                                >
                                    <option value="Personal">Personal</option>
                                    <option value="client">Client</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#e6edf3]">Role</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => updateField('role', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all"
                                >
                                    <option value="Frontend Developer">Frontend Developer</option>
                                    <option value="Full-Stack Developer">Full-Stack Developer</option>
                                    <option value="Full Stack Developer">Full Stack Developer</option>
                                    <option value="Fullstack Developer">Fullstack Developer</option>
                                    <option value="FullStack Developer">FullStack Developer</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#e6edf3]">Demo URL</label>
                                <input
                                    type="text"
                                    value={formData.demoUrl}
                                    onChange={(e) => updateField('demoUrl', e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-[#e6edf3]">Code URL</label>
                                <input
                                    type="text"
                                    value={formData.codeUrl}
                                    onChange={(e) => updateField('codeUrl', e.target.value)}
                                    placeholder="https://github.com/..."
                                    className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-[#e6edf3]">Project Image</label>
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
                                    <p className="text-sm text-[#e6edf3] font-medium">Click to upload project image</p>
                                    <p className="text-xs text-[#8b949e] mt-1">PNG, JPG, WebP up to 5MB</p>
                                </div>

                                {imagePreview && (
                                    <div className="relative w-full md:w-80 h-48 rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] flex-shrink-0 group">
                                        <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="p-2 bg-[#f85149] text-white rounded-lg hover:bg-[#da3633] transition-all shadow-lg"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                            <p className="text-[10px] text-white/70 truncate">{formData.image}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'description' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#e6edf3]">Short Description <span className="text-[#f85149]">*</span></label>
                            <input
                                type="text"
                                value={formData.details}
                                onChange={(e) => updateField('details', e.target.value)}
                                placeholder="A brief one-liner about the project"
                                required
                                className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#e6edf3]">Full Description <span className="text-[#f85149]">*</span></label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => updateField('description', e.target.value)}
                                placeholder="Detailed description of the project..."
                                rows={10}
                                required
                                className="w-full px-3 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all resize-none min-h-[250px]"
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'implementation' && renderArrayField(
                    'Technical Implementation',
                    'technicalDetails',
                    'e.g. Built with Next.js using server-side rendering',
                    'Describe the architecture and technologies used in this project'
                )}

                {activeTab === 'features' && renderArrayField(
                    'Key Features',
                    'keyFeatures',
                    'e.g. Responsive design with dark mode support',
                    'List the standout capabilities and functionality of the software'
                )}

                {activeTab === 'challenges' && renderArrayField(
                    'Challenges Faced',
                    'challenges',
                    'e.g. Optimizing performance for large datasets',
                    'Detail the obstacles you overcame during development'
                )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#30363d]">
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-[#8b949e] hover:text-[#e6edf3] bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-lg transition-all"
                >
                    Cancel
                </button>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {activeTab !== 'challenges' ? (
                        <button
                            type="button"
                            onClick={() => {
                                const tabOrder: TabType[] = ['info', 'description', 'implementation', 'features', 'challenges'];
                                const currentIndex = tabOrder.indexOf(activeTab);
                                setActiveTab(tabOrder[currentIndex + 1]);
                            }}
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
                            {isEditing ? 'Save Changes' : 'Publish Project'}
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default ProjectForm;
