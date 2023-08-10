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

  const isInviteMemberModalOpen = useModalStore(
    (state) => state.isInviteMemberModalOpen
  );

  const setIsInviteMemberModalOpen = useModalStore(
    (state) => state.setIsInviteMemberModalOpen
  );

  return (
    <>
      {isEditProjectModalOpen && status === "success" && (
        <EditProjectModal
          projectData={project!}
          isOpen={isEditProjectModalOpen}
        />
      )}

      {isInviteMemberModalOpen && (
        <InviteMemberPopup
          isOpen={isInviteMemberModalOpen}
          setIsOpen={setIsInviteMemberModalOpen}
          projectId={projectId as string}
          projectName={project?.name!}
        />
      )}
      {/* {isTaskDetailOpen && (
        <TaskDetailModal
          isOpen={isTaskDetailOpen}
          setIsModalOpen={setIsTaskDetailOpen}
        />
      )} */}

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
