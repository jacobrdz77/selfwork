import { useRouter } from "next/router";
import { useOneProject } from "../../hooks/ProjectHooks";
import ProjectHeader from "../header/ProjectHeader";
import EditProjectModal from "./EditProjectModal";
import { useModalStore } from "store/user";
import LoadingProjectHeader from "../loading/LoadingProjectHeader";
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
