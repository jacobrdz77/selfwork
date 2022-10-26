import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getOneProject } from "../../lib/projectsFunctions";
import Header from "../../components/UI/Header";
import EditProjectModal from "../../components/EditProjectModal";
import useProjects from "../../hooks/useProjects";
import useClients from "../../hooks/useClients";
import { useState } from "react";
import Button from "../../components/UI/Button";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import NoProjects from "../../components/NoProjects";
import Projects from "../../components/Projects";

const ProjectDetailPage = () => {
  const router = useRouter();
  const id = router.query.projectId as string;
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const { projects, status } = useProjects();
  const { clients } = useClients();
  const {
    data: project,
    isLoading,
    isError,
  } = useQuery(["oneProject", id], () => getOneProject(id));

  return (
    <>
      <EditProjectModal
        clients={clients!}
        projectData={project!}
        isOpen={isEditProjectModalOpen}
        setIsModalOpen={setIsEditProjectModalOpen}
      />
      {/* Wrapper */}
      <div className="h-full py-5 px-7">
        <Header
          isButton={true}
          buttonText="Edit Project"
          title={project?.name!}
          buttonHandler={() => {
            setIsEditProjectModalOpen(true);
          }}
        />
        <hr className="mt-4" />
        {/* Loading Spinner */}
        {status === "loading" && (
          <div className="w-full h-full flex justify-center mt-11">
            <LoadingSpinner />
          </div>
        )}
        {status === "success" && projects?.length === 0 && (
          <NoProjects
            buttonHandler={() => {
              setIsEditProjectModalOpen(true);
            }}
          />
        )}
        {status === "error" && (
          <div className="w-full h-full flex justify-center align-middle">
            <h1 className="text-2xl">Error</h1>
            <p className="text-gray-500">
              Sorry about that. Try to refresh the page.
            </p>
          </div>
        )}
        {/* Grid of projects */}
        {status === "success" && (
          <div>
            <h1>{project?.name}</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectDetailPage;
