import React from 'react';
import skillsData from './skills.json';

interface SkillBadgeProps {
  name: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-900/30 text-blue-400 text-sm hover:bg-blue-900/40 transition-colors">
    {name}
  </span>
);

const Skills: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold text-white mb-6">Skills</h2>
      
      <div className="space-y-6">
        {skillsData.skillCategories.map((category, index) => (
          <div key={index} className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-300">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <SkillBadge key={skillIndex} name={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;