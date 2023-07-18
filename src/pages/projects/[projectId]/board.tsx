import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { NextPageWithLayout } from "../../_app";
import { useSectionsOfProject, useSectionsOfUser } from "@/hooks/SectionHooks";
import Board from "@/components/task/Board";
import AddSectionButton from "@/components/sections/AddUserSectionButton";
import { useDrop } from "react-dnd";
import Boards from "@/components/sections/Boards";
import EditTaskModal from "@/components/task/EditTaskModal";
import { useModalStore } from "store/user";
import { useRouter } from "next/router";

const BoardPage: NextPageWithLayout = () => {
  const router = useRouter();
  const currentPath = router.pathname.split("/")[3];
  const { projectId } = router.query;
  const { projectSections, status } = useSectionsOfProject(projectId as string);

  return (
    <div className="project-page__board">
      {status === "loading" && <div>Loading...</div>}

      {status === "success" && (
        <Boards
          userSections={projectSections}
          isProject={true}
          projectId={projectId as string}
        />
      )}
    </div>
  );
};

BoardPage.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default BoardPage;
