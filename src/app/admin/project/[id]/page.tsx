import portfolioData from '@/components/Portfolio/portfolio.json';
import EditProjectClient from './EditProjectClient';

// Required for `output: export` (GitHub Pages) — pre-render one page per project id
export function generateStaticParams() {
    return portfolioData.map((project) => ({ id: project.id }));
}

export default function EditProjectPage() {
    return <EditProjectClient />;
}
