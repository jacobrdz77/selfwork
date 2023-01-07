import { useRouter } from "next/router";
import PageHeader from "../../components/header/PageHeader";
import EditProjectModal from "../../components/project/EditProjectModal";
import { useState } from "react";

import { useOneProject } from "../../hooks/ProjectHooks";

const ProjectDetailPage = () => {
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const { query } = useRouter();
  const projectId = query.projectId;

  const { project, status } = useOneProject(projectId as string);

  return (
    <>
      {isEditProjectModalOpen && (
        <EditProjectModal
          currentProjectData={project!}
          isOpen={isEditProjectModalOpen}
          setIsModalOpen={setIsEditProjectModalOpen}
        />
      )}
      <PageHeader
        isButton={true}
        buttonText="Edit Project"
        title={project?.name ? project.name : "Loading..."}
        buttonHandler={() => {
          setIsEditProjectModalOpen(true);
        }}
      />

      <div className="page project-page">
        {status === "loading" && <div>Loading...</div>}
        {status === "error" && (
          <div>
            <h1>Error</h1>
            <p>Try to refresh the page.</p>
          </div>
        )}

        {status === "success" && <p>{JSON.stringify(project)}</p>}
      </div>
    </>
  );
};

export default ProjectDetailPage;
