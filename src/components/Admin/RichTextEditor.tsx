'use client';

import React, { useRef, ChangeEvent } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import {
    Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
    Quote, Code, Heading1, Heading2, Link as LinkIcon,
    Image as ImageIcon, AlignLeft, AlignCenter, AlignRight,
    Undo, Redo, Eraser, Terminal
} from 'lucide-react';

const lowlight = createLowlight(common);

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!editor) return null;

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            editor.chain().focus().setImage({ src: result }).run();
            if (fileInputRef.current) fileInputRef.current.value = '';
        };
        reader.readAsDataURL(file);
    };

    const addImage = () => {
        fileInputRef.current?.click();
    };

    const setLink = () => {

        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    const buttons = [
        { icon: <Bold size={18} />, action: () => editor.chain().focus().toggleBold().run(), active: 'bold' },
        { icon: <Italic size={18} />, action: () => editor.chain().focus().toggleItalic().run(), active: 'italic' },
        { icon: <UnderlineIcon size={18} />, action: () => editor.chain().focus().toggleUnderline().run(), active: 'underline' },
        { type: 'divider' },
        { icon: <Heading1 size={18} />, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: { heading: { level: 1 } } },
        { icon: <Heading2 size={18} />, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: { heading: { level: 2 } } },
        { type: 'divider' },
        { icon: <List size={18} />, action: () => editor.chain().focus().toggleBulletList().run(), active: 'bulletList' },
        { icon: <ListOrdered size={18} />, action: () => editor.chain().focus().toggleOrderedList().run(), active: 'orderedList' },
        { type: 'divider' },
        { icon: <AlignLeft size={18} />, action: () => editor.chain().focus().setTextAlign('left').run(), active: { textAlign: 'left' } },
        { icon: <AlignCenter size={18} />, action: () => editor.chain().focus().setTextAlign('center').run(), active: { textAlign: 'center' } },
        { icon: <AlignRight size={18} />, action: () => editor.chain().focus().setTextAlign('right').run(), active: { textAlign: 'right' } },
        { type: 'divider' },
        { icon: <Quote size={18} />, action: () => editor.chain().focus().toggleBlockquote().run(), active: 'blockquote' },
        { icon: <Terminal size={18} />, action: () => editor.chain().focus().toggleCodeBlock().run(), active: 'codeBlock' },
        { type: 'divider' },
        { icon: <LinkIcon size={18} />, action: setLink, active: 'link' },
        { icon: <ImageIcon size={18} />, action: addImage },
        { type: 'divider' },
        { icon: <Undo size={18} />, action: () => editor.chain().focus().undo().run() },
        { icon: <Redo size={18} />, action: () => editor.chain().focus().redo().run() },
        { icon: <Eraser size={18} />, action: () => editor.chain().focus().unsetAllMarks().run() },
    ];

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b border-[#30363d] bg-[#1c2128]">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
            />
            {buttons.map((btn, i) => (
                btn.type === 'divider' ? (
                    <div key={i} className="w-[1px] h-6 bg-[#30363d] mx-1 my-auto" />
                ) : (
                    <button
                        key={i}
                        type="button"
                        onClick={btn.action}
                        className={`p-1.5 rounded transition-all ${btn.active && editor.isActive(btn.active)
                            ? 'bg-[#238636] text-white'
                            : 'text-[#8b949e] hover:bg-[#30363d] hover:text-[#e6edf3]'
                            }`}
                    >
                        {btn.icon}
                    </button>
                )
            ))}
        </div>
    );
};

const RichTextEditor = ({ content, onChange, placeholder }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false, // Disable default code block to use lowlight version
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-[#58a6ff] hover:underline cursor-pointer',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg border border-[#30363d] max-w-full h-auto my-4',
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Write something...',
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            CodeBlockLowlight.configure({
                lowlight,
                defaultLanguage: 'javascript',
                HTMLAttributes: {
                    class: 'rounded-lg bg-[#0d1117] p-4 font-mono text-sm border border-[#30363d] my-4',
                },
            }),
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {

            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-3 text-[#e6edf3] text-sm selection:bg-[#58a6ff]/30',
            },
        },
    });

    return (
        <div className="border border-[#30363d] rounded-lg bg-[#0d1117] overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            <style jsx global>{`
                .tiptap p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #484f58;
                    pointer-events: none;
                    height: 0;
                }
                .tiptap blockquote {
                    padding-left: 1rem;
                    border-left: 3px solid #30363d;
                    color: #8b949e;
                    font-style: italic;
                    margin: 1.5rem 0;
                }
                .tiptap ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin: 1rem 0;
                }
                .tiptap ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                    margin: 1rem 0;
                }
                .tiptap h1 { font-size: 1.875rem; font-weight: 700; margin: 2rem 0 1rem; }
                .tiptap h2 { font-size: 1.5rem; font-weight: 600; margin: 1.5rem 0 1rem; }

                /* Code highlighting colors (matching GitHub dark) */
                .hljs-comment, .hljs-quote { color: #8b949e; font-style: italic; }
                .hljs-keyword, .hljs-selector-tag { color: #ff7b72; }
                .hljs-string, .hljs-doctag, .hljs-template-variable { color: #a5d6ff; }
                .hljs-title, .hljs-section, .hljs-selector-id { color: #d2a8ff; font-weight: bold; }
                .hljs-variable, .hljs-template-variable { color: #ffa657; }
                .hljs-type, .hljs-built_in, .hljs-builtin-name { color: #ffa657; }
                .hljs-number, .hljs-symbol, .hljs-bullet { color: #79c0ff; }
            `}</style>
        </div>
    );
};

export default RichTextEditor;
