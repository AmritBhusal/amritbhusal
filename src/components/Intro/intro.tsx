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
  // const [isVisible, setIsVisible] = useState(false); // Removed for classic static load

  // useEffect(() => {
  //   const timer = setTimeout(() => setIsVisible(true), 100);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="min-h-screen lg:w-[85%] py-20 lg:py-2 bg-background relative overflow-hidden">
      {/* Animated Background Elements REMOVED */}

      <div className="relative z-10 w-full flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen px-6 lg:px-12 gap-16 lg:gap-24">
        {/* Left Section - Content */}
        <div
          className={`flex flex-col items-start justify-start gap-10 max-w-2xl`}
        >
          {/* Greeting with floating animation */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-muted rounded-lg border border-border">
                <Sparkles size={20} className="text-foreground" />
              </div>
              <span className="font-medium text-lg text-gray-500 tracking-wide">
                {introData.greeting}
              </span>
            </div>

            {/* Name Section with gradient text */}
            <div className="space-y-2">
              <h1 className="font-bold text-5xl lg:text-6xl leading-tight">
                I am{" "}
                <span className="text-foreground">
                  {introData.name}
                </span>
              </h1>

              {/* Animated Role with typewriter effect */}
              <div className="relative">
                <span className="font-semibold text-2xl lg:text-3xl text-gray-700 relative">
                  {introData.role}
                  <span className="absolute -right-1 top-0 w-0.5 h-full bg-foreground/50"></span>
                </span>
              </div>
            </div>
          </div>

          {/* CTA Section with enhanced styling */}
          <section className="space-y-6 w-full">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Coffee size={24} className="text-foreground" />
                {introData.ctaHeading}
              </h2>

              <div className="space-y-2">
                <p className="text-lg text-gray-600 leading-relaxed">
                  {introData.ctaDescription.split("using")[0]}
                </p>
                <p className="text-lg font-semibold text-foreground">
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
                <Button className="bg-foreground text-background hover:bg-muted-foreground font-semibold px-8 py-6 rounded-none border border-border hover:border-foreground transition-all duration-300 text-lg">
                  Hire Me
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </a>

              <a href={introData.resume} download className="group">
                <Button
                  variant="outline"
                  className="border-2 border-border hover:border-foreground text-foreground font-semibold px-8 py-6 rounded-none bg-background hover:bg-muted transition-all duration-300 text-lg"
                >
                  Resume
                  <Download className="ml-2" />
                </Button>
              </a>
            </div>

            {/* Enhanced Social Links */}
            <div className="flex items-center gap-4 pt-6">
              <span className="text-muted-foreground font-medium">
                Connect with me:
              </span>
              <div className="flex items-center gap-4">
                {[
                  {
                    Icon: FaFacebook,
                    href: introData.socialLinks.facebook,
                    color: "hover:text-foreground",
                    bg: "hover:bg-muted",
                  },
                  {
                    Icon: FaInstagram,
                    href: introData.socialLinks.instagram,
                    color: "hover:text-foreground",
                    bg: "hover:bg-muted",
                  },
                  {
                    Icon: FaWhatsapp,
                    href: introData.socialLinks.whatsapp,
                    color: "hover:text-foreground",
                    bg: "hover:bg-muted",
                  },
                  {
                    Icon: FaLinkedin,
                    href: introData.socialLinks.linkedin,
                    color: "hover:text-foreground",
                    bg: "hover:bg-muted",
                  },
                ].map(({ Icon, href, color, bg }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-none border border-border bg-background ${color} ${bg} transition-all duration-300 text-muted-foreground`}
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
          className={`relative`}
        >
          {/* Floating background elements REMOVED */}

          {/* Profile image container */}
          <div className="relative w-80 h-80 lg:w-96 lg:h-96">
            {/* Rotating border */}
            <div className="absolute inset-0 rounded-full bg-border p-1">
              <div className="w-full h-full rounded-full bg-background p-2">
                <div className="relative w-full h-full rounded-full overflow-hidden group shadow-none border border-border">
                  <Image
                    src="/profile.jpg"
                    alt="Profile Picture"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    priority
                  />
                  {/* Overlay gradient on hover REMOVED */}
                </div>
              </div>
            </div>

            {/* Floating icons around the image */}
            {/* Floating icons around the image REMOVED */
              /*
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-500">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-1000">
              <Coffee size={20} className="text-white" />
            </div>
              */
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
