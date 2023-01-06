import { Project } from "@prisma/client";
import Link from "next/link";

const ProjectCard: React.FC<{
  projectData: Project;
}> = ({ projectData }) => {
  return (
    <div className="project-card">
      {/* Header */}
      <div className="project-card__header">
        <Link
          className="project-card__name"
          href={`/projects/${projectData.id}`}
        >
          {projectData.name}
        </Link>
      </div>
      {/* Info */}
    </div>
  );
};

export default ProjectCard;
