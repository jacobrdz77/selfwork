import { useRouter } from "next/router";
import Header from "../../components/UI/Header";
import EditProjectModal from "../../components/EditProjectModal";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../../store/user";

const ProjectDetailPage = () => {
  const router = useRouter();
  const id = router.query.projectId as string;
  const userId = useAtomValue(userIdAtom);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const { data: project } = trpc.project.getOne.useQuery({ projectId: id });
  // const { data: clients } = trpc.client.getAll.useQuery({ userId: userId });

  return (
    <>
      {/* <EditProjectModal
        currentProjectData={project!}
        clients={clients!}
        isOpen={isEditProjectModalOpen}
        setIsModalOpen={setIsEditProjectModalOpen}
      /> */}
      {/* Wrapper */}
      <div className="h-full py-5 px-7">
        <Header
          isButton={true}
          buttonText="Edit Project"
          title={project?.name ? project.name : ""}
          subTitle={project?.clientName ? project.clientName : ""}
          buttonHandler={() => {
            setIsEditProjectModalOpen(true);
          }}
        />
        <hr className="mt-4" />
        <ProjectDetailPage />
      </div>
    </>
  );
};

export default ProjectDetailPage;
