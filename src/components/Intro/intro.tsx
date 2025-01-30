import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import introData from './intro.json';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const Intro = () => {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row items-center p-5 justify-center gap-16">
      {/* Left Section */}
      <div className="flex flex-col items-start justify-start gap-8 w-auto">
        <div className="flex flex-col items-start justify-start">
          <span className="font-medium text-md text-gray-400">{introData.greeting}</span>
          <span className="font-bold text-3xl">
            I am <span className="text-[#0e7cbe]">{introData.name}</span>
          </span>
          <span className="font-bold text-2xl">{introData.role}</span>
        </div>
        <section className="flex flex-col items-start gap-3 justify-start text-start">
          <h2 className="text-xl font-bold text-gray-800">
            {introData.ctaHeading}
          </h2>
          <p className="text-gray-600">
            {introData.ctaDescription.split("using")[0]}
            <br />
            <span className="font-semibold">
              {introData.ctaDescription.split("using")[1].trim()}
            </span>
          </p>
          <div className="flex items-center justify-start gap-6 py-4">
            {/* Hire Me Button with LinkedIn link */}
            <a
              href={introData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <Button>Hire Me</Button>
            </a>
            
            {/* Resume Download Button */}
            <a href={introData.resume} download className="btn">
              <Button variant="outline">Resume <Download /></Button>
              
            </a>
          </div>
          <div className="flex items-center justify-start gap-3">
            <span className="text-gray-500">Follow me on: </span>
            <div className="flex space-x-4 items-center justify-center">
              <a
                href={introData.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-gray-600 transition"
              >
                <FaFacebook className="h-6 w-6" />
              </a>
              <a
                href={introData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-800 hover:text-gray-500 transition"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href={introData.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-800 hover:text-gray-500 transition"
              >
                <FaWhatsapp className="h-6 w-6" />
              </a>
              <a
                href={introData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-gray-700 transition"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center p-8 rounded-full bg-gray-300 w-[250px] h-[250px]">
        <div className="w-full h-full"></div>
      </div>
    </div>
  );
};

export default Intro;
