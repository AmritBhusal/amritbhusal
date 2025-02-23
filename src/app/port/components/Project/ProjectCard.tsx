import React from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';

interface ProjectProps {
  id: string;
  type: string;
  name: string;
  details: string;
  demoUrl: string;
  codeUrl: string;
  role: string;
  keyFeatures: string[];
  technicalDetails: string[];
}

const ProjectCard: React.FC<ProjectProps> = ({
  name,
  details,
  demoUrl,
  codeUrl,
  type,
  role,
  keyFeatures,
  technicalDetails
}) => {
  return (
    <div className="bg-[#0A0F1C] rounded-lg p-6 hover:bg-[#111827] transition-all duration-300 border border-gray-800">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium px-2 py-1 rounded bg-blue-900/30 text-blue-400">
              {type}
            </span>
            <span className="text-xs font-medium px-2 py-1 rounded bg-purple-900/30 text-purple-400">
              {role}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
          <p className="text-gray-400 text-sm mb-4">{details}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Technical Details</h4>
          <ul className="list-disc list-inside space-y-1">
            {technicalDetails.slice(0, 3).map((detail, index) => (
              <li key={index} className="text-gray-400 text-sm">{detail}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Key Features</h4>
          <div className="flex flex-wrap gap-2">
            {keyFeatures.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        {demoUrl !== "#" && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/10 text-blue-400 text-sm hover:bg-blue-600/20 transition-colors"
          >
            <Globe size={16} />
            <span>Live Demo</span>
          </a>
        )}
        {codeUrl !== "#" && (
          <a
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 text-sm hover:bg-gray-700 transition-colors"
          >
            <Github size={16} />
            <span>Code</span>
          </a>
        )}
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 text-gray-300 text-sm hover:bg-gray-700 transition-colors ml-auto"
        >
          <ExternalLink size={16} />
          <span>Details</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;