'use client';

import React, { useRef } from 'react';
import { Search, Plus, Pencil, Trash2, ExternalLink, Globe, GripVertical } from 'lucide-react';
import { Project } from '../Intro/types';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ProjectListProps {
    projects: Project[];
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onCreateNew: () => void;
    onEdit: (project: Project) => void;
    onDelete: (projectId: string) => void;
    onReorder?: (projects: Project[]) => void;
}

interface SortableRowProps {
    project: Project;
    onEdit: (project: Project) => void;
    onDelete: (projectId: string) => void;
    isDragDisabled: boolean;
}

const SortableRow: React.FC<SortableRowProps> = ({ project, onEdit, onDelete, isDragDisabled }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: project.id, disabled: isDragDisabled });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : undefined,
        position: isDragging ? 'relative' as const : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group grid grid-cols-1 md:grid-cols-[36px_1fr_140px_140px_100px] gap-3 md:gap-4 px-5 py-4 transition-colors ${isDragging
                ? 'bg-[#1c2128] border border-[#58a6ff]/30 rounded-lg shadow-xl shadow-[#58a6ff]/5'
                : 'hover:bg-[#161b22]/60'
                }`}
        >
            {/* Drag Handle */}
            <div className="hidden md:flex items-center justify-center">
                {!isDragDisabled && (
                    <button
                        {...attributes}
                        {...listeners}
                        className="p-1 text-[#30363d] hover:text-[#8b949e] cursor-grab active:cursor-grabbing rounded transition-colors"
                        title="Drag to reorder"
                    >
                        <GripVertical size={16} />
                    </button>
                )}
            </div>

            {/* Project Info */}
            <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-[#484f58] font-mono">#{project.id}</span>
                    <h3 className="text-[#58a6ff] font-semibold truncate">{project.name}</h3>
                    {project.demoUrl !== '#' && (
                        <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#484f58] hover:text-[#58a6ff] transition-colors flex-shrink-0"
                        >
                            <Globe size={14} />
                        </a>
                    )}
                </div>
                <p className="text-xs text-[#8b949e] line-clamp-1">{project.details}</p>
            </div>

            {/* Role */}
            <div className="flex items-center">
                <span className="text-xs text-[#8b949e] bg-[#21262d] px-2.5 py-1 rounded-full border border-[#30363d]">
                    {project.role}
                </span>
            </div>

            {/* Type */}
            <div className="flex items-center">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${project.type === 'client'
                    ? 'bg-[#1f2937] text-[#f97316] border border-[#f97316]/20'
                    : 'bg-[#0f2e1e] text-[#3fb950] border border-[#3fb950]/20'
                    }`}>
                    {project.type === 'client' ? 'Client' : 'Personal'}
                </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-1">
                {project.demoUrl !== '#' && (
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[#484f58] hover:text-[#58a6ff] hover:bg-[#21262d] rounded-md transition-all"
                        title="Preview"
                    >
                        <ExternalLink size={15} />
                    </a>
                )}
                <button
                    onClick={() => onEdit(project)}
                    className="p-2 text-[#484f58] hover:text-[#e6edf3] hover:bg-[#21262d] rounded-md transition-all"
                    title="Edit"
                >
                    <Pencil size={15} />
                </button>
                <button
                    onClick={() => onDelete(project.id)}
                    className="p-2 text-[#484f58] hover:text-[#f85149] hover:bg-[#f85149]/10 rounded-md transition-all"
                    title="Delete"
                >
                    <Trash2 size={15} />
                </button>
            </div>
        </div>
    );
};

const ProjectList: React.FC<ProjectListProps> = ({
    projects,
    searchQuery,
    onSearchChange,
    onCreateNew,
    onEdit,
    onDelete,
    onReorder,
}) => {
    const isSearching = searchQuery.length > 0;
    const filteredProjects = isSearching
        ? projects.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.role.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : projects;

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id || !onReorder) return;

        const oldIndex = projects.findIndex(p => p.id === active.id);
        const newIndex = projects.findIndex(p => p.id === over.id);
        const reordered = arrayMove(projects, oldIndex, newIndex);

        // Reassign IDs based on new position (highest ID first)
        const maxId = Math.max(...reordered.map(p => Number(p.id)));
        const updated = reordered.map((p, i) => ({
            ...p,
            id: String(maxId - i),
        }));

        onReorder(updated);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#e6edf3]">Projects</h1>
                    <p className="text-sm text-[#8b949e] mt-1">{projects.length} projects total · Drag to reorder</p>
                </div>
                <button
                    onClick={onCreateNew}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#238636]/20"
                >
                    <Plus size={16} />
                    New Project
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#484f58]" />
                <input
                    type="text"
                    placeholder="Search projects by name, description, or role..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-[#161b22] border border-[#30363d] rounded-lg text-[#e6edf3] text-sm placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/30 transition-all"
                />
            </div>

            {/* Project Table */}
            <div className="border border-[#30363d] rounded-lg overflow-hidden bg-[#0d1117]">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-[36px_1fr_140px_140px_100px] gap-4 px-5 py-3 bg-[#161b22] border-b border-[#30363d] text-xs font-semibold text-[#8b949e] uppercase tracking-wider">
                    <span></span>
                    <span>Project</span>
                    <span>Role</span>
                    <span>Type</span>
                    <span className="text-right">Actions</span>
                </div>

                {/* Project Rows */}
                {filteredProjects.length === 0 ? (
                    <div className="py-16 text-center text-[#484f58]">
                        <p className="text-lg">No projects found</p>
                        <p className="text-sm mt-1">Try a different search term</p>
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={filteredProjects.map(p => p.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="divide-y divide-[#21262d]">
                                {filteredProjects.map((project) => (
                                    <SortableRow
                                        key={project.id}
                                        project={project}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                        isDragDisabled={isSearching}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    );
};

export default ProjectList;
