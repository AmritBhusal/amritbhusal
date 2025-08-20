"use client";

import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import introData from "./intro.json";
import { Button } from "@/components/ui/button";
import { Download, Sparkles, ArrowRight, Coffee } from "lucide-react";
import Image from "next/image";

const Intro = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen lg:w-[85%] py-20 lg:py-2 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-10 w-56 h-56 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      <div className="absolute -bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-indigo-200/30 to-blue-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>

      <div className="relative z-10 w-full flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen px-6 lg:px-12 gap-16 lg:gap-24">
        {/* Left Section - Content */}
        <div
          className={`flex flex-col items-start justify-start gap-10 max-w-2xl transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          {/* Greeting with floating animation */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg lg:animate-bounce">
                <Sparkles size={20} className="text-white" />
              </div>
              <span className="font-medium text-lg text-gray-500 tracking-wide">
                {introData.greeting}
              </span>
            </div>

            {/* Name Section with gradient text */}
            <div className="space-y-2">
              <h1 className="font-bold text-5xl lg:text-6xl leading-tight">
                I am{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                  {introData.name}
                </span>
              </h1>

              {/* Animated Role with typewriter effect */}
              <div className="relative">
                <span className="font-semibold text-2xl lg:text-3xl text-gray-700 relative">
                  {introData.role}
                  <span className="absolute -right-1 top-0 w-0.5 h-full bg-blue-600 animate-pulse"></span>
                </span>
              </div>
            </div>
          </div>

          {/* CTA Section with enhanced styling */}
          <section className="space-y-6 w-full">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Coffee size={24} className="text-blue-600" />
                {introData.ctaHeading}
              </h2>

              <div className="space-y-2">
                <p className="text-lg text-gray-600 leading-relaxed">
                  {introData.ctaDescription.split("using")[0]}
                </p>
                <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  using {introData.ctaDescription.split("using")[1]?.trim()}
                </p>
              </div>
            </div>

            {/* Enhanced Buttons with better animations */}
            <div className="flex items-center gap-6 pt-4">
              <a
                href={introData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg">
                  Hire Me
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </a>

              <a href={introData.resume} download className="group">
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-blue-600 font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm"
                >
                  Resume
                  <Download className="ml-2 group-hover:translate-y-1 transition-transform duration-300" />
                </Button>
              </a>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex items-center gap-4 pt-6">
              <span className="text-gray-600 font-medium">
                Connect with me:
              </span>
              <div className="flex items-center gap-4">
                {[
                  {
                    Icon: FaFacebook,
                    href: introData.socialLinks.facebook,
                    color: "hover:text-blue-600",
                    bg: "hover:bg-blue-50",
                  },
                  {
                    Icon: FaInstagram,
                    href: introData.socialLinks.instagram,
                    color: "hover:text-pink-600",
                    bg: "hover:bg-pink-50",
                  },
                  {
                    Icon: FaWhatsapp,
                    href: introData.socialLinks.whatsapp,
                    color: "hover:text-green-600",
                    bg: "hover:bg-green-50",
                  },
                  {
                    Icon: FaLinkedin,
                    href: introData.socialLinks.linkedin,
                    color: "hover:text-blue-700",
                    bg: "hover:bg-blue-50",
                  },
                ].map(({ Icon, href, color, bg }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-md ${color} ${bg} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 text-gray-600`}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Section - Enhanced Profile Image */}
        <div
          className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          {/* Floating background elements */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-30 animate-pulse delay-1000"></div>

          {/* Profile image container */}
          <div className="relative w-80 h-80 lg:w-96 lg:h-96">
            {/* Rotating border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-white p-2">
                <div className="relative w-full h-full rounded-full overflow-hidden group shadow-2xl">
                  <Image
                    src="/profile.jpg"
                    alt="Profile Picture"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    priority
                  />
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>

            {/* Floating icons around the image */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-500">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-1000">
              <Coffee size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
