import ProjectCard from "./ProjectCard";
import { Project } from "@prisma/client";

const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="projects flex gap-4 flex-wrap overflow-y-auto">
      {projects.map((project) => (
        <ProjectCard key={project.id} projectData={project} />
      ))}
    </div>
  );
};

export default Projects;
