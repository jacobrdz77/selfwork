import { useRouter } from "next/router";
import { useOneProject } from "../../hooks/ProjectHooks";
import ProjectHeader from "../header/ProjectHeader";
import EditProjectModal from "./EditProjectModal";
import { useModalStore } from "store/user";
import LoadingProjectHeader from "../loading/LoadingProjectHeader";

const ProjectPageLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { projectId } = useRouter().query;
  const { project, status } = useOneProject(projectId as string);

  const isEditProjectModalOpen = useModalStore(
    (state) => state.isEditProjectModalOpen
  );

  return (
    <>
      {isEditProjectModalOpen && status === "success" && (
        <EditProjectModal
          projectData={project!}
          isOpen={isEditProjectModalOpen}
        />
      )}

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
