import { useRouter } from "next/router";
import { useState } from "react";
import { useOneProject } from "../../hooks/ProjectHooks";
import ProjectHeader from "../header/ProjectHeader";
import EditProjectModal from "./EditProjectModal";

const ProjectPageLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { query } = useRouter();
  const projectId = query.projectId;
  // Need to fix /projects/undefined when this layout is mounted
  const { project } = useOneProject(projectId as string);

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
      <ProjectHeader title={project?.name ? project.name : "Loading..."} />
      <div className="page project-page">{children}</div>
    </>
  );
};

export default ProjectPageLayout;
