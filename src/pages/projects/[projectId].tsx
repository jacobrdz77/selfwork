import { useRouter } from "next/router";
import PageHeader from "../../components/header/PageHeader";
import EditProjectModal from "../../components/project/EditProjectModal";
import { useState } from "react";
import { useUserStore } from "../../store/user";
import { useQuery } from "@tanstack/react-query";
import { getOneProject } from "../../utils/projectFunctions";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

import { useOneProject } from "../../hooks/ProjectHooks";

const ProjectDetailPage = () => {
  const { query } = useRouter();
  const projectId = query.projectId as string;
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);

  const { project, status } = useOneProject(projectId);

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

        {status === "success" && JSON.stringify(project)}
      </div>
    </>
  );
};

export default ProjectDetailPage;
