import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useOneProject } from "../../hooks/ProjectHooks";
import ProjectHeader from "../header/ProjectHeader";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import EditProjectModal from "./EditProjectModal";
import { useModalStore } from "store/user";
import InviteMemberPopup from "../member/InviteMemberPopup";
// import TaskDetailModal from "../task/TaskDetailModal";

const ProjectPageLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { projectId } = useRouter().query;
  const { project, status } = useOneProject(projectId as string);

  const isTaskDetailOpen = useModalStore((state) => state.isTaskDetailOpen);
  const setIsTaskDetailOpen = useModalStore(
    (state) => state.setIsTaskDetailOpen
  );

  const isEditProjectModalOpen = useModalStore(
    (state) => state.isEditProjectModalOpen
  );

  const setIsEditProjectModalOpen = useModalStore(
    (state) => state.setIsEditProjectModalOpen
  );

  return (
    <>
      {isEditProjectModalOpen && status === "success" && (
        <EditProjectModal
          projectData={project!}
          isOpen={isEditProjectModalOpen}
        />
      )}

      {/* {isTaskDetailOpen && (
        <TaskDetailModal
          isOpen={isTaskDetailOpen}
          setIsModalOpen={setIsTaskDetailOpen}
        />
      )} */}

      {status === "loading" && <LoadingProjectHeader />}

      {status === "success" && (
        <ProjectHeader
          project={project!}
          name={project?.name}
          status={status}
        />
      )}
      <div className="page project-page">{children}</div>
    </>
  );
};

export default ProjectPageLayout;

const LoadingProjectHeader = () => {
  return (
    <div className="project-loading">
      <div className="project-header__top">
        <div className="project-header__icon">
          <LoadingSkeleton />
        </div>
        <div className="project-header__name">
          <LoadingSkeleton />
        </div>
        <div className="project-header__status">
          <LoadingSkeleton />
        </div>
      </div>
      <nav>
        <ul className="project-header__nav">
          <li>
            <LoadingSkeleton />
          </li>
          <li>
            <LoadingSkeleton />
          </li>
          <li>
            <LoadingSkeleton />
          </li>
          <li>
            <LoadingSkeleton />
          </li>
        </ul>
      </nav>
    </div>
  );
};
