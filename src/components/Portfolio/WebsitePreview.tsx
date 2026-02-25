'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Loader2, Maximize2, X } from 'lucide-react';

interface WebsitePreviewProps {
    demoUrl: string;
    image: string;
    name: string;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ demoUrl, image, name }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogLoading, setIsDialogLoading] = useState(true);
    const hasLiveUrl = demoUrl && demoUrl !== '#';

    if (!hasLiveUrl) {
        return (
            <div className="relative aspect-video">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover object-top"
                    priority
                />
            </div>
        );
    }

    return (
        <>
            <div className="relative aspect-video">
                {/* Loading state */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#161b22] z-10">
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 size={24} className="text-[#58a6ff] animate-spin" />
                            <span className="text-xs text-[#8b949e]">Loading preview...</span>
                        </div>
                    </div>
                )}

                {/* Live iframe */}
                <iframe
                    src={demoUrl}
                    title={`${name} - Live Preview`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                    onLoad={() => setIsLoading(false)}
                />

                {/* Enlarge button */}
                <button
                    onClick={() => {
                        setIsDialogOpen(true);
                        setIsDialogLoading(true);
                    }}
                    className="absolute bottom-3 right-3 z-20 p-2 bg-[#21262d]/90 hover:bg-[#30363d] border border-[#30363d] rounded-md text-[#c9d1d9] hover:text-white transition-colors cursor-pointer"
                    title="Enlarge preview"
                >
                    <Maximize2 size={16} />
                </button>
            </div>

            {/* Fullscreen Dialog */}
            {isDialogOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    onClick={() => setIsDialogOpen(false)}
                >
                    <div
                        className="relative bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden shadow-2xl"
                        style={{ width: '90vw', height: '90vh' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Dialog Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                            <span className="text-sm text-[#c9d1d9] font-semibold">{name}</span>
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="p-1 hover:bg-[#30363d] rounded text-[#8b949e] hover:text-white transition-colors cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Dialog iframe */}
                        <div className="relative w-full" style={{ height: 'calc(100% - 49px)' }}>
                            {isDialogLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#0d1117] z-10">
                                    <div className="flex flex-col items-center gap-2">
                                        <Loader2 size={32} className="text-[#58a6ff] animate-spin" />
                                        <span className="text-sm text-[#8b949e]">Loading website...</span>
                                    </div>
                                </div>
                            )}
                            <iframe
                                src={demoUrl}
                                title={`${name} - Full Preview`}
                                className="w-full h-full border-0"
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                onLoad={() => setIsDialogLoading(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WebsitePreview;
