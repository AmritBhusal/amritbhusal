"use client";

import React, { useState } from "react";
import portfolioData from "./portfolio.json";
import { Button } from "@/components/ui/button";
import { Eye, SquareArrowOutUpRight } from "lucide-react";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

const Portfolio = () => {
  const [filter, setFilter] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const sortedProjects = [...portfolioData];

  const filteredProjects =
    filter === "all"
      ? sortedProjects
      : sortedProjects.filter(
        (project: any) => project.type.toLowerCase() === filter.toLowerCase()
      );

  const projectsToShow = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = filteredProjects.length > visibleCount;

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setVisibleCount(6);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full md:w-[95%] p-2 overflow-hidden">
      <div className="w-full flex items-center justify-center">
        <span className="font-bold text-3xl whitespace-nowrap text-center">
          Portfolio
        </span>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-10">
        <div className="flex flex-wrap gap-6 border-b p-8 w-full justify-center">
          {["all", "client", "personal"].map((type) => (
            <span
              key={type}
              className={`font-medium text-xl whitespace-nowrap text-center cursor-pointer ${filter === type ? "text-blue-500" : ""
                }`}
              onClick={() => handleFilterChange(type)}
            >
              {type === "all"
                ? "All Projects"
                : `${type.charAt(0).toUpperCase() + type.slice(1)} Projects`}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:p-4">
          {projectsToShow.map((project: any) => (
            <div
              key={project.id}
              className="overflow-hidden shadow-custom rounded-lg"
            >
              <div className="w-full min-h-[250px] max-h-[250px] overflow-hidden border bg-gray-200 rounded-t-lg group">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={500}
                  height={250}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-4 flex items-center justify-center w-full gap-3 md:gap-6">
                <Button variant="outline" disabled={project.demoUrl === "#"}>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <SquareArrowOutUpRight /> Demo
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/detail/${project.id}`}>
                    <Eye size={20} />
                    Details
                  </Link>
                </Button>
                <Button variant="outline" disabled={project.codeUrl === "#"}>
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <BsGithub /> Code
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {hasMoreProjects && (
          <div className="w-full flex justify-center mt-8">
            <Button
              onClick={handleShowMore}
              variant="default"
              className="px-8 py-2 text-lg"
            >
              Show More Projects
            </Button>
          </div>
        )}

        <div className="text-center text-gray-400">
          Showing {projectsToShow.length} of {filteredProjects.length} projects
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
