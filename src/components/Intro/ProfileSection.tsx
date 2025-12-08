'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Link as LinkIcon, Mail, Users, Star, GitBranch, Book, Package } from 'lucide-react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import introData from './intro.json';
import aboutData from '../About/about.json';
import { Button } from '@/components/ui/button';

const ProfileSection = () => {
    return (
        <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-8 text-[#c9d1d9]">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Left Sidebar - Profile Info */}
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
                        {/* Status Icon Mockup */}
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

                {/* Right Content - Tabs and Pinned */}
                <div className="flex-1 min-w-0">
                    {/* Tabs Mockup */}
                    <div className="flex items-center gap-4 border-b border-[#30363d] mb-4 overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-[#f78166] font-semibold text-[#c9d1d9] cursor-pointer whitespace-nowrap">
                            <Book size={16} /> Overview
                        </div>
                        {/* <div className="flex items-center gap-2 px-4 py-2 hover:bg-[#161b22] rounded-t-md text-[#c9d1d9] cursor-pointer whitespace-nowrap transition-colors">
                            <Package size={16} /> Repositories <span className="text-xs bg-[#21262d] px-2 rounded-full text-[#8b949e]">15</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 hover:bg-[#161b22] rounded-t-md text-[#c9d1d9] cursor-pointer whitespace-nowrap transition-colors">
                            <GitBranch size={16} /> Projects
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 hover:bg-[#161b22] rounded-t-md text-[#c9d1d9] cursor-pointer whitespace-nowrap transition-colors">
                            <Star size={16} /> Stars <span className="text-xs bg-[#21262d] px-2 rounded-full text-[#8b949e]">42</span>
                        </div> */}
                    </div>

                    {/* README Section */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-[#8b949e]">AmritBhusal / README.md</span>
                        </div>
                        <div className="border border-[#30363d] rounded-md bg-[#0d1117] p-6 lg:p-10">
                            <h2 className="text-3xl font-bold border-b border-[#30363d] pb-2 mb-6 text-[#c9d1d9]">
                                Hi there 👋, I'm {introData.name}
                            </h2>

                            <div className="space-y-4 text-[#c9d1d9]">
                                <p className="text-lg">
                                    {introData.greeting} I'm <span className="font-semibold text-[#58a6ff]">{introData.role}</span> from {aboutData.details.city}.
                                </p>

                                <p>
                                    {introData.ctaDescription}
                                </p>

                                <div className="py-4">
                                    <h3 className="text-xl font-bold mb-3">About Me</h3>
                                    <ul className="list-disc list-inside space-y-1 text-[#8b949e]">
                                        <li>🔭 I’m currently working on <strong>Ecommerce and Travel Websites</strong></li>
                                        <li>🌱 I’m currently learning <strong>Advanced Next.js </strong></li>
                                        <li>👯 I’m looking to collaborate on <strong>Open Source Projects</strong></li>
                                        <li>💬 Ask me about <strong>React,Next.js, Tailwind, Frontend</strong></li>
                                        <li>⚡ Fun fact: <strong>I love coding in Dark Mode</strong></li>
                                    </ul>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <a href={introData.resume} download className="px-4 py-2 bg-[#238636] text-white rounded-md font-semibold text-sm hover:bg-[#2ea043] transition-colors border border-[rgba(240,246,252,0.1)]">
                                        View Resume
                                    </a>
                                    <a href="#contact" className="px-4 py-2 bg-[#21262d] text-[#58a6ff] rounded-md font-semibold text-sm hover:bg-[#30363d] transition-colors border border-[#30363d]">
                                        Contact Me
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pinned Repositories Mockup */}
                    {/* <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[16px] font-semibold text-[#c9d1d9]">Pinned</h2>
                            <span className="text-xs text-[#58a6ff] cursor-pointer hover:underline">Customize your pins</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-[#58a6ff] font-semibold cursor-pointer hover:underline">
                                    <Book size={16} className="text-[#8b949e]" />
                                    <span>portfolio-v2</span>
                                    <span className="border border-[#30363d] rounded-full px-2 text-[10px] text-[#8b949e] font-medium">Public</span>
                                </div>
                                <p className="text-xs text-[#8b949e]">Personally Portfolio website built with Next.js and Tailwind CSS.</p>
                                <div className="flex items-center gap-4 mt-auto pt-2 text-xs text-[#8b949e]">
                                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#3178c6]"></span> TypeScript</div>
                                    <div className="flex items-center gap-1"><Star size={12} /> 12</div>
                                    <div className="flex items-center gap-1"><GitBranch size={12} /> 3</div>
                                </div>
                            </div>

                            <div className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-[#58a6ff] font-semibold cursor-pointer hover:underline">
                                    <Book size={16} className="text-[#8b949e]" />
                                    <span>e-commerce-platform</span>
                                    <span className="border border-[#30363d] rounded-full px-2 text-[10px] text-[#8b949e] font-medium">Public</span>
                                </div>
                                <p className="text-xs text-[#8b949e]">Full stack e-commerce solution with Stripe integration.</p>
                                <div className="flex items-center gap-4 mt-auto pt-2 text-xs text-[#8b949e]">
                                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#f1e05a]"></span> JavaScript</div>
                                    <div className="flex items-center gap-1"><Star size={12} /> 8</div>
                                    <div className="flex items-center gap-1"><GitBranch size={12} /> 5</div>
                                </div>
                            </div>

                            <div className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-[#58a6ff] font-semibold cursor-pointer hover:underline">
                                    <Book size={16} className="text-[#8b949e]" />
                                    <span>task-manager-api</span>
                                    <span className="border border-[#30363d] rounded-full px-2 text-[10px] text-[#8b949e] font-medium">Public</span>
                                </div>
                                <p className="text-xs text-[#8b949e]">RESTful API for task management using Node.js and Express.</p>
                                <div className="flex items-center gap-4 mt-auto pt-2 text-xs text-[#8b949e]">
                                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#3178c6]"></span> TypeScript</div>
                                    <div className="flex items-center gap-1"><Star size={12} /> 4</div>
                                    <div className="flex items-center gap-1"><GitBranch size={12} /> 1</div>
                                </div>
                            </div>

                            <div className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-[#58a6ff] font-semibold cursor-pointer hover:underline">
                                    <Book size={16} className="text-[#8b949e]" />
                                    <span>react-components-lib</span>
                                    <span className="border border-[#30363d] rounded-full px-2 text-[10px] text-[#8b949e] font-medium">Public</span>
                                </div>
                                <p className="text-xs text-[#8b949e]">A collection of reusable React components.</p>
                                <div className="flex items-center gap-4 mt-auto pt-2 text-xs text-[#8b949e]">
                                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#f1e05a]"></span> JavaScript</div>
                                    <div className="flex items-center gap-1"><Star size={12} /> 15</div>
                                    <div className="flex items-center gap-1"><GitBranch size={12} /> 8</div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
