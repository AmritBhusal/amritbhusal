import { Metadata } from 'next';
import Detail from "@/components/Portfolio/Detail";
import portfolioData from '@/components/Portfolio/portfolio.json';

const siteUrl = 'https://amritbhusal1.com.np';

// Define the project type
interface Project {
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

// Generate static params for all project IDs
export async function generateStaticParams() {
  return portfolioData.map((project) => ({
    id: project.id,
  }));
}

// Generate dynamic metadata for each project
export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params;
  const project = portfolioData.find((p) => p.id === id) as Project | undefined;

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  const title = `${project.name} - Project Details`;
  const description = `${project.details} Role: ${project.role}. ${project.description}`;
  const keywords = [
    project.name,
    project.role,
    project.type,
    ...project.technicalDetails.slice(0, 5).map(t => t.split(' ').slice(0, 3).join(' ')),
    'Amrit Bhusal',
    'Portfolio Project',
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${siteUrl}/detail/${project.id}`,
      siteName: 'Amrit Bhusal - Frontend Developer',
      images: [
        {
          url: `${siteUrl}${project.image}`,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
      publishedTime: new Date().toISOString(),
      authors: ['Amrit Bhusal'],
      tags: keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}${project.image}`],
      creator: '@AmritBhusal',
    },
    alternates: {
      canonical: `${siteUrl}/detail/${project.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const DetailPage = () => {
  return <Detail />;
};

export default DetailPage;