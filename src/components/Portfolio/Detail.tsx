'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BsGithub } from 'react-icons/bs';
import { SquareArrowOutUpRight, Link as LinkIcon, Tag, User2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import portfolioData from './portfolio.json';
import Link from 'next/link';


interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value, href }) => (
  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      {href ? (
        <Link href={href} className="text-blue-500 hover:underline font-medium" target="_blank" rel="noopener noreferrer">
          {value}
        </Link>
      ) : (
        <p className="font-medium">{value}</p>
      )}
    </div>
  </div>
);

const ProjectDetail: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  const project = portfolioData.find(p => p.id === id);

  if (!project) {
    return <div className="container mx-auto px-4 py-8">Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-700 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-8">
          <Link href="/" className="text-blue-500 hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-60">Project Details</span>
        </div>

        {/* Project Header */}
        <div className="bg-gray-600 rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6">{project.name}</h1>

          {/* Project Image */}
          <div className="mb-6 relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover object-top ease-linear cursor-pointer"
              priority
            />
          </div>

          <div className="grid grid-cols-1 text-black md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <InfoCard icon={<Tag />} label="Project Type" value={project.type} />
            <InfoCard icon={<User2 />} label="Role" value={project.role} />
            <InfoCard
              icon={<LinkIcon />}
              label="Demo URL"
              value="View Demo"
              href={project.demoUrl}
            />
          </div>
        </div>

        {/* Project Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                <p className="text-gray-400 leading-relaxed mb-4">{project.details}</p>
                <p className="text-gray-400 leading-relaxed">{project.description}</p>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Technical Implementation</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {project.technicalDetails.map((detail, index) => (
                    <li key={index} className="text-gray-400">{detail}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Challenges & Solutions</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="text-gray-400">{challenge}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {project.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              {project.demoUrl !== "#" && (
                <Button className="w-full" asChild>
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <SquareArrowOutUpRight className="mr-2 h-4 w-4" />
                    Live Demo
                  </Link>
                </Button>
              )}
              {project.codeUrl !== "#" && (
                <Button variant="outline" className="w-full" asChild>
                  <Link href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                    <BsGithub className="mr-2 h-4 w-4" />
                    Code
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;