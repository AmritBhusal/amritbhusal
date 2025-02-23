import React from 'react';
import { GraduationCap } from 'lucide-react';
import educationData from './education.json';

const Education: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-white mb-6">Education</h2>
      
      <div className="space-y-6">
        {educationData.education.map((edu, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <GraduationCap className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {edu.school} – {edu.location}
                  </h3>
                  <p className="text-gray-400">{edu.degree}</p>
                </div>
                <span className="text-sm text-gray-500">{edu.period}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
{/* 
      <h3 className="text-2xl font-bold text-white mt-8 mb-6">Certificates</h3>
      <div className="space-y-4">
        {educationData.certificates.map((cert, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <Award className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-grow">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-white">{cert.name}</h4>
                  <p className="text-sm text-gray-400">{cert.issuer}</p>
                </div>
                <span className="text-sm text-gray-500">{cert.year}</span>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Education;