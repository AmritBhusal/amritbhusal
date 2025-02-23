'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Command, MapPin, X } from 'lucide-react';
import profileData from './data.json';
import CommandDialog from './CommandDialog';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import Image from 'next/image';

const ProfileCard = () => {
  const { profile } = profileData;
    const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="bg-[#0a0b14] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        {/* Profile Card */}
        <div className="bg-[#1a1b26] rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <Image
              src={profile.avatarUrl} 
              alt={profile.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">
                {profile.name}
              </h1>
              <p className="text-gray-400">
                {profile.title}
              </p>
              <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                <MapPin size={14} />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Card */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1a1b26] rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-4">
              <a href={profile.socials.twitter} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </a>
              <a href={profile.socials.github} className="text-gray-400 hover:text-white transition-colors">
                <BsGithub size={24} />
              </a>
              <a href={profile.socials.linkedin} className="text-gray-400 hover:text-white transition-colors">
                <BsLinkedin size={24} />
              </a>
              <a href={profile.socials.email} className="text-gray-400 hover:text-white transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Options Button */}
          <div className="bg-[#1a1b26] rounded-2xl p-6 flex items-center justify-center">
            <button 
              onClick={() => setCommandOpen(true)}
              className="text-[#3b82f6] hover:text-blue-400 transition-colors flex flex-col items-center gap-2"
            >
              <Command size={24} />
              <span className="text-sm">Open options</span>
            </button>
          </div>

          <CommandDialog 
            open={commandOpen} 
            onOpenChange={setCommandOpen}
          />
        </div>

        {/* About Section */}
        <div className="bg-[#1a1b26] rounded-2xl p-6">
          <h2 className="text-2xl text-white mb-4">About</h2>
          <p className="text-[#3b82f6] leading-relaxed">
            {profile.about}
          </p>
          {/* <div className="flex items-center gap-2 mt-4 text-gray-400">
            <Moon size={16} />
            <span>{profile.theme}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;