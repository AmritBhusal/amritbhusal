import React from 'react';
import ProjectCard from './ProjectCard';
import projectsData from '@/components/Portfolio/portfolio.json';

const ProjectsGrid: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020817] p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;