import React from 'react';
import { FolderKanban, MessageSquare } from 'lucide-react';
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import ContactForm from '../Contact/ContactForm';
import introData from '../Intro/intro.json';

const ContactTab = () => {
    return (
        <div className="w-full space-y-6">
            {/* Persuasive Header */}
            <div className="border border-[#30363d] rounded-md bg-[#0d1117] overflow-hidden">
                <div className="bg-[#161b22] px-6 py-4 border-b border-[#30363d]">
                    <div className="flex items-center gap-2">
                        <FolderKanban size={20} className="text-[#8b949e]" />
                        <h2 className="text-lg font-semibold text-[#c9d1d9]">Let&apos;s Build Something Great</h2>
                    </div>
                    <p className="text-sm text-[#8b949e] mt-1">
                        Need a frontend developer for your startup, dashboard, or eCommerce platform? Let&apos;s build it.
                    </p>
                </div>

                {/* Quick Contact Links */}
                <div className="px-6 py-4 border-b border-[#30363d]">
                    <h3 className="text-sm font-semibold text-[#c9d1d9] mb-3 flex items-center gap-2">
                        <MessageSquare size={14} className="text-[#58a6ff]" />
                        Quick Reach
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href={introData.socialLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d] hover:border-[#25d366] transition-colors text-sm text-[#c9d1d9]"
                        >
                            <FaWhatsapp size={16} className="text-[#25d366]" />
                            WhatsApp
                        </a>
                        <a
                            href={introData.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d] hover:border-[#0a66c2] transition-colors text-sm text-[#c9d1d9]"
                        >
                            <FaLinkedin size={16} className="text-[#0a66c2]" />
                            LinkedIn
                        </a>
                        <a
                            href="mailto:bhusalamrit41@gmail.com"
                            className="flex items-center gap-2 px-4 py-2 bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d] hover:border-[#58a6ff] transition-colors text-sm text-[#c9d1d9]"
                        >
                            <Mail size={16} className="text-[#58a6ff]" />
                            Email
                        </a>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="p-0">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default ContactTab;
