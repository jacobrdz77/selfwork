import Link from "next/link";
import useMenu from "@/hooks/useMenu";
import { Project } from "@prisma/client";
import { useDeleteProject } from "@/hooks/ProjectHooks";
import { useModalStore } from "store/user";

const ProjectCard: React.FC<{
  projectData: Project;
}> = ({ projectData }) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { mutate } = useDeleteProject();

  const setIsEditProjectModalOpen = useModalStore(
    (state) => state.setIsEditProjectModalOpen
  );

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
            setIsEditProjectModalOpen(true);
            setIsMenuOpen(false);
          }}
        >
          Edit project details
        </div>
        <div
          className="project-card__edit-menu-item project-card__edit-menu-item--delete"
          onClick={() => {
            setIsMenuOpen(false);
            mutate(projectData.id);
          }}
        >
          Delete project
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
