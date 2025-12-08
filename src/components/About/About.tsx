import React from "react";
import aboutData from "./about.json";
import Image from "next/image";
import { MapPin, User, Briefcase, ExternalLink, Sparkles } from "lucide-react";

const About = () => {
  const { title, description, details } = aboutData;

  return (
    <div className="relative lg:w-[85%] items-center justify-center flex flex-col p-0 overflow-hidden py-10">
      {/* Background with gradient and pattern REMOVED */}

      <div className="relative z-10 w-full flex flex-col p-8 gap-8 bg-card rounded-none border border-border">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-muted rounded-lg mb-2 border border-border">
            <Sparkles size={24} className="text-foreground" />
          </div>
          <h2 className="font-bold text-4xl text-foreground tracking-tight">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto font-light">
            {description}
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Profile Image */}
          <div className="relative group">
            {/* Gradient glow removed */}
            <div className="relative bg-card p-2 border border-border rounded-none">
              <div className="w-64 h-64 overflow-hidden">
                <Image
                  src="/profile.jpg"
                  alt="Profile Picture"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex-1 max-w-md space-y-6">
            <div className="grid gap-6">
              {/* Full Name */}
              <div className="group p-4 bg-muted/30 rounded-none border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-muted border border-border rounded-sm flex items-center justify-center">
                    <User size={16} className="text-foreground" />
                  </div>
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Full Name
                  </span>
                </div>
                <span className="font-semibold text-lg text-foreground ml-11">
                  {details.fullName}
                </span>
              </div>

              {/* LinkedIn */}
              <div className="group p-4 bg-muted/30 rounded-none border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-muted border border-border rounded-sm flex items-center justify-center">
                    <ExternalLink size={16} className="text-foreground" />
                  </div>
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    LinkedIn
                  </span>
                </div>
                <a
                  href={details.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-11 inline-flex items-center gap-2 font-semibold text-lg text-foreground hover:text-muted-foreground transition-colors duration-200 group"
                >
                  Amrit Bhusal
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </a>
              </div>

              {/* City */}
              <div className="group p-4 bg-muted/30 rounded-none border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-muted border border-border rounded-sm flex items-center justify-center">
                    <MapPin size={16} className="text-foreground" />
                  </div>
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Location
                  </span>
                </div>
                <span className="font-semibold text-lg text-foreground ml-11">
                  {details.city}
                </span>
              </div>

              {/* Freelance */}
              <div className="group p-4 bg-muted/30 rounded-none border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-muted border border-border rounded-sm flex items-center justify-center">
                    <Briefcase size={16} className="text-foreground" />
                  </div>
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Availability
                  </span>
                </div>
                <div className="ml-11 flex items-center gap-2">
                  <span className="font-semibold text-lg text-foreground">
                    {details.freelance}
                  </span>
                  <div className="w-2 h-2 bg-foreground rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
