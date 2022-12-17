import { Project } from "@prisma/client";

const ProjectCard: React.FC<{
  projectData: Project;
}> = ({ projectData }) => {
  return (
    <div className="project-card">
      {/* Header */}
      <div className="project-card__header">
        <a className="project-card__name" href={`/projects/${projectData.id}`}>
          {projectData.name}
        </a>
      </div>
      {/* Info */}
    </div>
  );
};

export default ProjectCard;
