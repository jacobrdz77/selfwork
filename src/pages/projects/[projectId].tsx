import { useRouter } from "next/router";
import Header from "../../components/header/PageHeader";
import EditProjectModal from "../../components/project/EditProjectModal";
import { useState } from "react";
import useProjects from "../../hooks/useProjects";
import { useUserStore } from "../../store/user";

const ProjectDetailPage = () => {
  const router = useRouter();
  const id = router.query.projectId as string;
  const userId = useUserStore((state) => state.userId);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);

  return (
    <>
      {/* <EditProjectModal
        currentProjectData={project!}
        clients={clients!}
        isOpen={isEditProjectModalOpen}
        setIsModalOpen={setIsEditProjectModalOpen}
      /> */}
      {/* Wrapper */}
      <Header
        isButton={true}
        buttonText="Edit Project"
        title={project?.name ? project.name : ""}
        subTitle={project?.clientName ? project.clientName : ""}
        buttonHandler={() => {
          setIsEditProjectModalOpen(true);
        }}
      />
      <ProjectDetailPage />
    </>
  );
};

export default ProjectDetailPage;
