import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useOneProject } from "../../hooks/ProjectHooks";
import ProjectHeader from "../header/ProjectHeader";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import EditProjectModal from "./EditProjectModal";

const ProjectPageLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { projectId } = useRouter().query;
  const { project, status } = useOneProject(projectId as string);

  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);

  return (
    <>
      {isEditProjectModalOpen && (
        <EditProjectModal
          currentProjectData={project!}
          isOpen={isEditProjectModalOpen}
          setIsModalOpen={setIsEditProjectModalOpen}
        />
      )}
      <ProjectHeader
        title={status === "loading" ? <LoadingSkeleton /> : project?.name!}
      />
      <div className="page project-page">{children}</div>
    </>
  );
};

export default ProjectPageLayout;
