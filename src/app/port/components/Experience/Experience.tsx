'use client';

import { useState } from 'react';
import experienceData from './experience.json';

interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  duration?: string;
  location?: string;
  summary?: string;
  responsibilities?: string[];
  technologies?: string[];
}

interface TechBadgeProps {
  tech: string;
}

interface ExpandedItems {
  [key: number]: boolean;
}

const TechBadge: React.FC<TechBadgeProps> = ({ tech }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-900/40 text-blue-400 mr-2 mb-2">
    {tech}
  </span>
);

const Experience: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});

  const toggleExpand = (index: number): void => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Experience</h1>
      
      <div className="space-y-8">
        {(experienceData.experiences as Experience[]).map((exp, index) => (
          <div key={index} className="relative pl-8 border-l-2 border-blue-900">
            {/* Timeline dot */}
            <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-blue-600" />
            
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold flex items-center">
                    {exp.title} @ {exp.company}
                    {exp.companyUrl && (
                      <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" 
                         className="ml-2 text-blue-400 hover:text-blue-300">
                        ↗
                      </a>
                    )}
                  </h3>
                  {exp.location && (
                    <p className="text-gray-400 mt-1">{exp.location}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-gray-400">{exp.period}</p>
                  {exp.duration && (
                    <p className="text-sm text-gray-500">{exp.duration}</p>
                  )}
                </div>
              </div>

              {exp.summary && (
                <div className="mt-4 text-gray-300">
                  <h4 className="font-semibold mb-2">Summary:</h4>
                  <p>{exp.summary}</p>
                </div>
              )}

              {exp.responsibilities && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2 text-gray-300">Responsibilities:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-400">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {exp.technologies && (
                <div className="mt-4">
                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-blue-400 hover:text-blue-300 mb-2"
                  >
                    {expandedItems[index] ? 'Show less' : 'Show more'}
                  </button>
                  
                  {expandedItems[index] && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <TechBadge key={idx} tech={tech} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;