import Link from "next/link";
import useMenu from "@/hooks/useMenu";
import { Project } from "@prisma/client";
import { useDeleteProject } from "@/hooks/ProjectHooks";

const ProjectCard: React.FC<{
  projectData: Project;
}> = ({ projectData }) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { mutate } = useDeleteProject();

  return (
    <Link
      href={`/projects/${projectData.id}/overview`}
      className="project-card"
    >
      <span>{projectData.name}</span>
      <div
        ref={btnRef}
        onClick={(e) => {
          e.preventDefault();
          setIsMenuOpen(!isMenuOpen);
        }}
        className="project-card__more-btn"
        role="button"
      >
        <svg className="project-card__more-icon" viewBox="0 0 16 16">
          <path d="M2,6C0.896,6,0,6.896,0,8s0.896,2,2,2s2-0.896,2-2S3.104,6,2,6z M8,6C6.896,6,6,6.896,6,8s0.896,2,2,2s2-0.896,2-2  S9.104,6,8,6z M14,6c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S15.104,6,14,6z" />
        </svg>
      </div>
      <div
        className={`project-card__edit-menu ${
          isMenuOpen ? "project-card__edit-menu--active" : ""
        }`}
        ref={menuRef}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div
          className="project-card__edit-menu-item"
          onClick={() => {
            setIsMenuOpen(false);
            console.log("EDIT");
          }}
        >
          <svg className="project-card__edit-menu--icon" viewBox="0 0 24 24">
            <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z" />
          </svg>
          Edit project details
        </div>
        <div
          className="project-card__edit-menu-item project-card__edit-menu-item--delete"
          onClick={() => {
            setIsMenuOpen(false);
            mutate(projectData.id);
          }}
        >
          <svg className="project-card__edit-menu--icon" viewBox="0 0 24 24">
            <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
          </svg>
          Delete project
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
