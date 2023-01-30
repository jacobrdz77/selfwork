import ProjectCard from "./ProjectCard";
import { Project } from "@prisma/client";

const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="projects">
      {projects.map((project) => (
        <ProjectCard key={project.id} projectData={project} />
      ))}
    </div>
  );
};

export default Projects;
