import ProjectCard from "./ProjectCard";
import { Project } from "@prisma/client";

const Projects: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="projects">
      {/* <div className="project-card">
        <div className="project-card__header">
          <p>Create New Project</p>
        </div>
      </div> */}
      {projects.map((project) => (
        <ProjectCard key={project.id} projectData={project} />
      ))}
    </div>
  );
};

export default Projects;
