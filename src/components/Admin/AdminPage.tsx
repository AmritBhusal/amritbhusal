'use client';

import React, { useState } from 'react';
import { FolderKanban, AlertTriangle } from 'lucide-react';
import portfolioData from '../Portfolio/portfolio.json';
import { Project } from '../Intro/types';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';

type View = 'list' | 'create' | 'edit';

const AdminPage = () => {
    const [projects, setProjects] = useState<Project[]>(portfolioData as Project[]);
    const [view, setView] = useState<View>('list');
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    const sortedProjects = [...projects].sort((a, b) => Number(b.id) - Number(a.id));

    const nextId = String(Math.max(...projects.map(p => Number(p.id))) + 1);

    const handleCreateNew = () => {
        setEditingProject(null);
        setView('create');
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setView('edit');
    };

    const handleSave = (project: Project) => {
        if (view === 'edit') {
            setProjects(prev => prev.map(p => p.id === project.id ? project : p));
        } else {
            setProjects(prev => [...prev, project]);
        }
        setView('list');
        setEditingProject(null);
    };

    const handleCancel = () => {
        setView('list');
        setEditingProject(null);
    };

    const handleDeleteRequest = (projectId: string) => {
        setDeleteTarget(projectId);
    };

    const handleConfirmDelete = () => {
        if (deleteTarget) {
            setProjects(prev => prev.filter(p => p.id !== deleteTarget));
            setDeleteTarget(null);
        }
    };

    const deleteProjectName = deleteTarget
        ? projects.find(p => p.id === deleteTarget)?.name ?? 'this project'
        : '';

    return (
        <div className="w-full min-h-screen bg-[#0d1117]">
            {/* Top Nav */}
            <div className="sticky top-0 z-10 bg-[#161b22] border-b border-[#30363d] backdrop-blur-md bg-opacity-80">
                <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-3">
                    <FolderKanban size={20} className="text-[#58a6ff]" />
                    <span className="text-sm font-semibold text-[#e6edf3]">Portfolio Admin</span>
                    <span className="text-xs text-[#484f58]">•</span>
                    <span className="text-xs text-[#8b949e]">
                        {view === 'list' ? 'Dashboard' : view === 'create' ? 'New Project' : `Editing: ${editingProject?.name}`}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                {view === 'list' && (
                    <ProjectList
                        projects={sortedProjects}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onCreateNew={handleCreateNew}
                        onEdit={handleEdit}
                        onDelete={handleDeleteRequest}
                    />
                )}

                {(view === 'create' || view === 'edit') && (
                    <ProjectForm
                        project={editingProject}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        nextId={nextId}
                    />
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <DialogContent className="bg-[#161b22] border-[#30363d] text-[#e6edf3] max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-[#e6edf3] flex items-center gap-2">
                            <AlertTriangle size={20} className="text-[#f85149]" />
                            Delete Project
                        </DialogTitle>
                        <DialogDescription className="text-[#8b949e]">
                            Are you sure you want to delete <strong className="text-[#e6edf3]">{deleteProjectName}</strong>? This action cannot be undone.
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

export default AdminPage;
