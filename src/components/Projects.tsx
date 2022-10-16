import React, { FC } from "react";
import { Project } from "@prisma/client";
import { ProjectForProjectCard } from "../pages/projects";
import ProjectCard from "./ProjectCard";

const Projects: FC<{ projects: any[]; status: string }> = ({
  projects,
  status,
}) => {
  return (
    <div className="mt-10">
      <div className="flex gap-4 flex-wrap overflow-y-auto">
        {status === "success" &&
          projects.map((project: ProjectForProjectCard) => (
            <ProjectCard key={project.id} projectData={project} />
          ))}
      </div>
    </div>
  );
};

export default Projects;
