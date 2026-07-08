import React, { useState } from 'react';
import { Pin, Book, Check } from 'lucide-react';
import { Project } from './types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';

interface PinDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    pinnedIds: string[];
    sortedProjects: Project[];
    onSavePins: (pinnedIds: string[]) => void;
}

const PinDialog: React.FC<PinDialogProps> = ({ isOpen, onOpenChange, pinnedIds, sortedProjects, onSavePins }) => {
    const [tempPinnedIds, setTempPinnedIds] = useState<string[]>([]);

    const handleOpen = (open: boolean) => {
        if (open) {
            setTempPinnedIds([...pinnedIds]);
        }
        onOpenChange(open);
    };

    const handleTogglePin = (projectId: string) => {
        setTempPinnedIds(prev => {
            if (prev.includes(projectId)) {
                return prev.filter(id => id !== projectId);
            } else if (prev.length < 6) {
                return [...prev, projectId];
            }
            return prev;
        });
    };

    const handleSave = () => {
        onSavePins(tempPinnedIds);
        onOpenChange(false);
    };

    const handleCancel = () => {
        setTempPinnedIds([]);
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpen}>
            <DialogContent className="bg-[#221d17] border-[#3a3128] text-[#ebdbb2] max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-[#ebdbb2] flex items-center gap-2">
                        <Pin size={18} />
                        Customize your pinned repositories
                    </DialogTitle>
                    <DialogDescription className="text-[#a89984]">
                        Select up to 6 repositories to pin to your profile.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pr-2 -mr-2">
                    <div className="space-y-2">
                        {sortedProjects.map((project) => {
                            const isSelected = tempPinnedIds.includes(project.id);
                            const isDisabled = !isSelected && tempPinnedIds.length >= 6;

                            return (
                                <button
                                    key={project.id}
                                    onClick={() => handleTogglePin(project.id)}
                                    disabled={isDisabled}
                                    className={`w-full flex items-center gap-3 p-3 rounded-md border transition-colors text-left ${isSelected
                                        ? 'border-[#1793d1] bg-[#1b1712]'
                                        : isDisabled
                                            ? 'border-[#3a3128] bg-[#1b1712] opacity-50 cursor-not-allowed'
                                            : 'border-[#3a3128] bg-[#1b1712] hover:border-[#a89984]'
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${isSelected
                                        ? 'bg-[#238636] border-[#238636]'
                                        : 'border-[#3a3128]'
                                        }`}>
                                        {isSelected && <Check size={14} className="text-white" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <Book size={14} className="text-[#a89984] flex-shrink-0" />
                                            <span className="text-[#1793d1] font-medium truncate">{project.name}</span>
                                            <span className="border border-[#3a3128] rounded-full px-2 text-[10px] text-[#a89984] font-medium flex-shrink-0">
                                                {project.type === 'client' ? 'Private' : 'Public'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#a89984] truncate mt-1">{project.details}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <DialogFooter className="border-t border-[#3a3128] pt-4 mt-4">
                    <div className="flex items-center justify-between w-full">
                        <span className="text-sm text-[#a89984]">
                            {tempPinnedIds.length}/6 repositories selected
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-[#2b241b] text-[#ebdbb2] rounded-md font-semibold text-sm hover:bg-[#3a3128] transition-colors border border-[#3a3128]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-[#238636] text-white rounded-md font-semibold text-sm hover:bg-[#2ea043] transition-colors border border-[rgba(240,246,252,0.1)]"
                            >
                                Save pins
                            </button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PinDialog;
