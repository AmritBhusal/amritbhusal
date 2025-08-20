import React from "react";
import aboutData from "./about.json";
import Image from "next/image";
import { MapPin, User, Briefcase, ExternalLink, Sparkles } from "lucide-react";

const About = () => {
  const { title, description, details } = aboutData;

  return (
    <div className="relative lg:w-[85%] items-center justify-center flex flex-col p-0 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl"></div>

      {/* Decorative elements */}
      <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-lg"></div>

      <div className="relative z-10 w-full flex flex-col p-8 gap-8 bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-2">
            <Sparkles size={24} className="text-white" />
          </div>
          <h2 className="font-bold text-4xl bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent tracking-tight">
            {title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto font-light">
            {description}
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Profile Image */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white p-2 rounded-2xl shadow-xl">
              <div className="w-64 h-64 overflow-hidden rounded-xl">
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
              <div className="group p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="font-semibold text-xs uppercase tracking-wider text-gray-500">
                    Full Name
                  </span>
                </div>
                <span className="font-semibold text-lg text-gray-800 ml-11">
                  {details.fullName}
                </span>
              </div>

              {/* LinkedIn */}
              <div className="group p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <ExternalLink size={16} className="text-white" />
                  </div>
                  <span className="font-semibold text-xs uppercase tracking-wider text-gray-500">
                    LinkedIn
                  </span>
                </div>
                <a
                  href={details.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-11 inline-flex items-center gap-2 font-semibold text-lg text-blue-600 hover:text-blue-700 transition-colors duration-200 group"
                >
                  Amrit Bhusal
                  <ExternalLink
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </a>
              </div>

              {/* City */}
              <div className="group p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <span className="font-semibold text-xs uppercase tracking-wider text-gray-500">
                    Location
                  </span>
                </div>
                <span className="font-semibold text-lg text-gray-800 ml-11">
                  {details.city}
                </span>
              </div>

              {/* Freelance */}
              <div className="group p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Briefcase size={16} className="text-white" />
                  </div>
                  <span className="font-semibold text-xs uppercase tracking-wider text-gray-500">
                    Availability
                  </span>
                </div>
                <div className="ml-11 flex items-center gap-2">
                  <span className="font-semibold text-lg text-gray-800">
                    {details.freelance}
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
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
