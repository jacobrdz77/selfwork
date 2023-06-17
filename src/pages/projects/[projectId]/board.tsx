import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { NextPageWithLayout } from "../../_app";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import Board from "@/components/task/Board";
import AddSectionButton from "@/components/sections/AddSectionButton";
import { useDrop } from "react-dnd";
import Boards from "@/components/sections/Boards";

const BoardPage: NextPageWithLayout = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();

  return (
    <div className="project-page__board">
      {status === "loading" && <div>Loading...</div>}

      {status === "success" && <Boards userSections={userSections} />}
    </div>
  );
};

BoardPage.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default BoardPage;
