export interface Project {
    id: string;
    type: string;
    name: string;
    image: string;
    demoUrl: string;
    details: string;
    codeUrl: string;
    role: string;
    description: string;
    technicalDetails: string[];
    keyFeatures: string[];
    challenges: string[];
}

export type TabType = 'overview' | 'repositories' | 'projects';

export const getLanguageColor = (project: Project): string => {
    const techDetails = project.technicalDetails.join(' ').toLowerCase();
    if (techDetails.includes('typescript') || techDetails.includes('next.js')) return '#3178c6';
    if (techDetails.includes('solidity')) return '#AA6746';
    if (techDetails.includes('react') || techDetails.includes('javascript')) return '#f1e05a';
    return '#3178c6';
};

export const getLanguageName = (project: Project): string => {
    const techDetails = project.technicalDetails.join(' ').toLowerCase();
    if (techDetails.includes('typescript')) return 'TypeScript';
    if (techDetails.includes('next.js')) return 'TypeScript';
    if (techDetails.includes('solidity')) return 'Solidity';
    if (techDetails.includes('javascript')) return 'JavaScript';
    return 'TypeScript';
};
