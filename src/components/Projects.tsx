import ProjectCard from "./ProjectCard";
import { NewProjectData } from "../hooks/useProjectForm";

const Projects: React.FC<{ projects: any[]; status: string }> = ({
  projects,
  status,
}) => {
  return (
    <div className="mt-10">
      <div className="flex gap-4 flex-wrap overflow-y-auto">
        {status === "success" &&
          projects.map((project: NewProjectData) => (
            <ProjectCard key={project.id} projectData={project} />
          ))}
      </div>
    </div>
  );
};

export default Projects;
