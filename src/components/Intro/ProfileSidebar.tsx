import React from 'react';
import Image from 'next/image';
import { MapPin, Link as LinkIcon, Mail, Users } from 'lucide-react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import introData from './intro.json';
import aboutData from '../About/about.json';

const ProfileSidebar = () => {
    return (
        <div className="w-full md:w-[296px] flex flex-col gap-4 flex-shrink-0">
            <div className="relative group w-[296px] h-[296px] mx-auto md:mx-0">
                <div className="rounded-full overflow-hidden border border-[#30363d] w-full h-full bg-[#0d1117]">
                    <Image
                        src="/profile.jpg"
                        alt="Profile"
                        width={296}
                        height={296}
                        className="w-full h-full object-cover"
                        priority
                    />
                </div>
                {/* Status Icon */}
                <div className="absolute bottom-10 right-0 md:right-4 bg-[#21262d] p-2 rounded-full border border-[#30363d] shadow-sm cursor-pointer hover:text-[#58a6ff] transition-colors">
                    <div className="w-5 h-5 flex items-center justify-center">🎯</div>
                </div>
            </div>

            <div className="flex flex-col gap-1 px-2">
                <h1 className="text-2xl font-bold text-[#c9d1d9] leading-tight">
                    {introData.name}
                </h1>
                <span className="text-xl text-[#8b949e] font-light">AmritBhusal</span>
            </div>

            <div className="px-2">
                <p className="text-[#c9d1d9] text-[16px] leading-[1.5]">
                    {aboutData.description}
                </p>
            </div>

            <div className="px-2 w-full">
                <div className="flex flex-col gap-2 text-[#c9d1d9] text-sm">
                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-[#8b949e]" />
                        <span>{introData.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#8b949e]" />
                        <span>{aboutData.details.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail size={16} className="text-[#8b949e]" />
                        <a href="mailto:bhusalamrit41@gmail.com" className="hover:text-[#58a6ff] hover:underline">bhusalamrit41@gmail.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <LinkIcon size={16} className="text-[#8b949e]" />
                        <a href={aboutData.details.website} target="_blank" className="hover:text-[#58a6ff] hover:underline truncate max-w-[200px]">
                            {aboutData.details.website}
                        </a>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#30363d] w-full">
                    <h3 className="font-semibold text-base mb-2">Socials</h3>
                    <div className="flex gap-2">
                        <a href={introData.socialLinks.github || "#"} className="p-2 bg-[#21262d] rounded-md border border-[#30363d] hover:bg-[#30363d] text-[#c9d1d9]"><FaGithub size={18} /></a>
                        <a href={introData.socialLinks.linkedin} className="p-2 bg-[#21262d] rounded-md border border-[#30363d] hover:bg-[#30363d] text-[#c9d1d9]"><FaLinkedin size={18} /></a>
                        <a href={introData.socialLinks.facebook} className="p-2 bg-[#21262d] rounded-md border border-[#30363d] hover:bg-[#30363d] text-[#c9d1d9]"><FaFacebook size={18} /></a>
                        <a href={introData.socialLinks.instagram} className="p-2 bg-[#21262d] rounded-md border border-[#30363d] hover:bg-[#30363d] text-[#c9d1d9]"><FaInstagram size={18} /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
