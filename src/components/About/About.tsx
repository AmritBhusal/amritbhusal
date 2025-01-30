import React from 'react';
import aboutData from './about.json';

const About = () => {
  const { title, description, details } = aboutData;

  return (
<div className="bg-gradient-to-br from-indigo-50 to-blue-50 lg:w-[65%] items-center justify-center flex flex-col p-8 rounded-3xl gap-6 shadow-lg">
      <div className="w-full flex items-center justify-center">
        <span className="font-bold text-4xl text-gray-800 text-center tracking-tight">
          {title}
        </span>
      </div>
      <div className="w-full flex items-center justify-center">
        <span className="text-gray-500 text-center font-normal text-lg leading-relaxed">
          {description}
        </span>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="bg-white p-4 w-[100%] md:min-w-[250px] md:max-w-[250px] min-h-[250px] max-h-[250px] rounded-2xl shadow-lg"></div>

        <div className="w-full md:w-auto flex flex-col items-start justify-start gap-6 px-6">
          <div className="flex flex-col items-start justify-start gap-4">
            <div className="flex flex-col items-start justify-start gap-1">
              <span className="font-semibold text-sm uppercase tracking-wider text-gray-400">Full Name</span>
              <span className="font-medium text-xl text-gray-800">{details.fullName}</span>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <span className="font-semibold text-sm uppercase tracking-wider text-gray-400">Website</span>
              <a href={details.website} target="_blank" rel="noopener noreferrer">
                <span className="font-medium text-xl text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
                  {details.website}
                </span>
              </a>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <span className="font-semibold text-sm uppercase tracking-wider text-gray-400">City</span>
              <span className="font-medium text-xl text-gray-800">{details.city}</span>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <span className="font-semibold text-sm uppercase tracking-wider text-gray-400">Freelance</span>
              <span className="font-medium text-xl text-gray-800">{details.freelance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
