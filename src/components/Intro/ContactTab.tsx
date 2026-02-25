import React from 'react';
import { FolderKanban } from 'lucide-react';
import ContactForm from '../Contact/ContactForm';

const ContactTab = () => {
    return (
        <div className="w-full">
            <div className="border border-[#30363d] rounded-md bg-[#0d1117] overflow-hidden">
                <div className="bg-[#161b22] px-6 py-4 border-b border-[#30363d]">
                    <div className="flex items-center gap-2">
                        <FolderKanban size={20} className="text-[#8b949e]" />
                        <h2 className="text-lg font-semibold text-[#c9d1d9]">Get In Touch</h2>
                    </div>
                    <p className="text-sm text-[#8b949e] mt-1">Have a project in mind? Let&apos;s collaborate!</p>
                </div>
                <div className="p-0">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default ContactTab;
