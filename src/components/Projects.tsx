import ProjectCard from "./ProjectCard";
import { Project } from "@prisma/client";

const Projects: React.FC<{ projects: Project[]; status: string }> = ({
  projects,
  status,
}) => {
  return (
    <div className="mt-10">
      <div className="flex gap-4 flex-wrap overflow-y-auto">
        {status === "success" &&
          projects.map((project) => (
            <ProjectCard key={project.id} projectData={project} />
          ))}
      </div>
    </div>
  );
};

export default Projects;
