import React from 'react';
import aboutData from './about.json';

const About = () => {
  const { title, description, details } = aboutData;

  return (
    <div className="bg-gray-300 w-[95%] items-center justify-center flex flex-col p-8 rounded-2xl gap-4">
      <div className="w-full flex items-center justify-center">
        <span className="font-bold text-3xl text-center">{title}</span>
      </div>
      <div className="w-full flex items-center justify-center">
        <span className="text-gray-600 text-center font-medium py-4">
          {description}
        </span>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="bg-gray-100 p-4 min-w-[250px] max-w-[250px] min-h-[250px] max-h-[250px] rounded-md shadow-custom"></div>

        <div className="w-auto flex flex-col items-start justify-start gap-4 px-4">
          <div className="flex flex-col items-start justify-start gap-3">
            <div className="flex flex-col items-start justify-start">
              <span className="font-bold text-lg">Full Name</span>
              <span className="font-medium text-md text-gray-600">{details.fullName}</span>
            </div>
            <div className="flex flex-col items-start justify-start">
              <span className="font-bold text-lg">Website</span>
              <a href={details.website} target="_blank" rel="noopener noreferrer">
                <span className="font-medium text-md text-blue-600 hover:underline">
                  {details.website}
                </span>
              </a>
            </div>
            <div className="flex flex-col items-start justify-start">
              <span className="font-bold text-lg">City</span>
              <span className="font-medium text-md text-gray-600">{details.city}</span>
            </div>
            <div className="flex flex-col items-start justify-start">
              <span className="font-bold text-lg">Freelance</span>
              <span className="font-medium text-md text-gray-600">{details.freelance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
