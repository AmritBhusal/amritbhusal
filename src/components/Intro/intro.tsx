import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import introData from './intro.json';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Image from 'next/image';

const Intro = () => {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row items-center p-5 justify-center gap-16">
      {/* Left Section */}
      <div className="flex flex-col items-start justify-start gap-8 w-auto opacity-0 animate-fade-in">
        <div className="flex flex-col items-start justify-start">
          {/* Greeting */}
          <div className="overflow-hidden">
            <span className="font-medium text-md text-gray-400 inline-block opacity-0 animate-text-focus-in delay-200">
              {introData.greeting}
            </span>
          </div>
          
          {/* Name Section */}
          <div className="overflow-hidden">
            <h1 className="font-bold text-3xl opacity-0 animate-scale-in delay-400">
              I am{" "}
              <span className="text-[#0e7cbe] inline-block animate-button delay-800">
                {introData.name}
              </span>
            </h1>
          </div>
          
          {/* Role */}
          <div className="overflow-hidden">
            <span className="font-bold text-2xl inline-block opacity-0 animate-text-focus-in delay-600">
              {introData.role}
            </span>
          </div>
        </div>
        
        <section className="flex flex-col items-start gap-3 justify-start text-start">
          {/* CTA Heading */}
          <div className="overflow-hidden">
            <h2 className="text-xl font-bold text-gray-800 opacity-0 animate-scale-in delay-800">
              {introData.ctaHeading}
            </h2>
          </div>
          
          {/* Description */}
          <div className="overflow-hidden max-w-xl">
            <p className="text-gray-600">
              <span className="inline-block opacity-0 animate-fade-in delay-1000">
                {introData.ctaDescription.split("using")[0]}
              </span>
              <br />
              <span className="font-semibold inline-block opacity-0 animate-scale-in delay-1200">
                using {introData.ctaDescription.split("using")[1].trim()}
              </span>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-start gap-6 py-4">
            <div className="opacity-0 animate-scale-in delay-1000">
              <a
                href={introData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transform hover:scale-110 transition-all duration-300"
              >
                <Button className="animate-button shadow-custom">Hire Me</Button>
              </a>
            </div>
            
            <div className="opacity-0 animate-scale-in delay-1000">
              <a 
                href={introData.resume} 
                download 
                className="inline-block transform hover:scale-110 transition-all duration-300"
              >
                <Button variant="outline" className="group shadow-custom">
                  Resume 
                  <Download className="ml-2 group-hover:translate-y-1 transition-transform duration-300" />
                </Button>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="opacity-0 animate-fade-in delay-1200">
            <div className="flex items-center justify-start gap-3">
              <span className="text-gray-500">Follow me on: </span>
              <div className="flex space-x-4 items-center justify-center">
                {[
                  { Icon: FaFacebook, href: introData.socialLinks.facebook, color: 'text-blue-800' },
                  { Icon: FaInstagram, href: introData.socialLinks.instagram, color: 'text-pink-800' },
                  { Icon: FaWhatsapp, href: introData.socialLinks.whatsapp, color: 'text-green-800' },
                  { Icon: FaLinkedin, href: introData.socialLinks.linkedin, color: 'text-blue-800' }
                ].map(({ Icon, href, color }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${color} opacity-0 animate-scale-in hover:text-gray-600 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1`}
                    style={{ animationDelay: `${1400 + (index * 100)}ms` }}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Right Section - Profile Image */}
      <div className="relative w-[250px] h-[250px] rounded-full overflow-hidden opacity-0 animate-scale-in">
        <div className="absolute inset-0 bg-[#0e7cbe] opacity-20 animate-button" />
        <Image 
          src="/profile.jpg" 
          alt="Profile Picture" 
          width={250} 
          height={250} 
          className="w-full h-full object-cover transform hover:scale-110 transition-all duration-500"
          priority
        />
      </div>
    </div>
  );
};

export default Intro;