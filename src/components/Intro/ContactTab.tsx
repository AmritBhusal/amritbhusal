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
            <div className="border border-[#3a3128] rounded-md bg-[#1b1712] overflow-hidden">
                <div className="bg-[#221d17] px-6 py-4 border-b border-[#3a3128]">
                    <div className="flex items-center gap-2">
                        <FolderKanban size={20} className="text-[#a89984]" />
                        <h2 className="text-lg font-semibold text-[#ebdbb2]">Let&apos;s Build Something Great</h2>
                    </div>
                    <p className="text-sm text-[#a89984] mt-1">
                        Need a frontend developer for your startup, dashboard, or eCommerce platform? Let&apos;s build it.
                    </p>
                </div>

                {/* Quick Contact Links */}
                <div className="px-6 py-4 border-b border-[#3a3128]">
                    <h3 className="text-sm font-semibold text-[#ebdbb2] mb-3 flex items-center gap-2">
                        <MessageSquare size={14} className="text-[#1793d1]" />
                        Quick Reach
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href={introData.socialLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#2b241b] border border-[#3a3128] rounded-md hover:bg-[#3a3128] hover:border-[#25d366] transition-colors text-sm text-[#ebdbb2]"
                        >
                            <FaWhatsapp size={16} className="text-[#25d366]" />
                            WhatsApp
                        </a>
                        <a
                            href={introData.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#2b241b] border border-[#3a3128] rounded-md hover:bg-[#3a3128] hover:border-[#0a66c2] transition-colors text-sm text-[#ebdbb2]"
                        >
                            <FaLinkedin size={16} className="text-[#0a66c2]" />
                            LinkedIn
                        </a>
                        <a
                            href="mailto:bhusalamrit41@gmail.com"
                            className="flex items-center gap-2 px-4 py-2 bg-[#2b241b] border border-[#3a3128] rounded-md hover:bg-[#3a3128] hover:border-[#1793d1] transition-colors text-sm text-[#ebdbb2]"
                        >
                            <Mail size={16} className="text-[#1793d1]" />
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
