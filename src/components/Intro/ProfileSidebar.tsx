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
                <div className="rounded-full overflow-hidden border border-[#3a3128] w-full h-full bg-[#1b1712]">
                    <Image
                        src="/profile.jpg"
                        alt="Profile"
                        width={296}
                        height={296}
                        className="w-full h-full object-cover"
                        priority
                    />
                </div>
                {/* Open to Work Badge */}
                <div className="absolute bottom-8 -right-1 md:right-2 bg-[#2b241b] px-3 py-1.5 rounded-full border border-[#1793d1] shadow-lg cursor-pointer hover:bg-[#3a3128] transition-colors items-center text-center flex">
                    <span className="text-xs font-semibold text-[#1793d1] whitespace-nowrap">Open to Work</span>
                </div>
            </div>

            <div className="flex flex-col gap-1 px-2">
                <h1 className="text-2xl font-bold text-[#ebdbb2] leading-tight">
                    {introData.name}
                </h1>
                <span className="text-xl text-[#a89984] font-light">AmritBhusal</span>
            </div>

            <div className="px-2">
                <p className="text-[#ebdbb2] text-[16px] leading-[1.5]">
                    {aboutData.description}
                </p>
            </div>

            <div className="px-2 w-full">
                <div className="flex flex-col gap-2 text-[#ebdbb2] text-sm">
                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-[#a89984]" />
                        <span>{introData.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#a89984]" />
                        <span>{aboutData.details.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail size={16} className="text-[#a89984]" />
                        <a href="mailto:bhusalamrit41@gmail.com" className="hover:text-[#1793d1] hover:underline">bhusalamrit41@gmail.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <LinkIcon size={16} className="text-[#a89984]" />
                        <a href={aboutData.details.website} target="_blank" className="hover:text-[#1793d1] hover:underline truncate max-w-[200px]">
                            {aboutData.details.website}
                        </a>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#3a3128] w-full">
                    <h3 className="font-semibold text-base mb-2">Socials</h3>
                    <div className="flex gap-2">
                        <a href={introData.socialLinks.github || "#"} className="p-2 bg-[#2b241b] rounded-md border border-[#3a3128] hover:bg-[#3a3128] text-[#ebdbb2]"><FaGithub size={18} /></a>
                        <a href={introData.socialLinks.linkedin} className="p-2 bg-[#2b241b] rounded-md border border-[#3a3128] hover:bg-[#3a3128] text-[#ebdbb2]"><FaLinkedin size={18} /></a>
                        <a href={introData.socialLinks.facebook} className="p-2 bg-[#2b241b] rounded-md border border-[#3a3128] hover:bg-[#3a3128] text-[#ebdbb2]"><FaFacebook size={18} /></a>
                        <a href={introData.socialLinks.instagram} className="p-2 bg-[#2b241b] rounded-md border border-[#3a3128] hover:bg-[#3a3128] text-[#ebdbb2]"><FaInstagram size={18} /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
