import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { NextPageWithLayout } from "../../_app";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import Board from "@/components/UI/Board";

const BoardPage: NextPageWithLayout = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();
  return (
    <div className="project-page__board">
      {status === "loading" && <div>Loading...</div>}

      {status === "success" && (
        <div className="boards">
          {userSections?.map((section) => (
            <Board
              key={section.id}
              tasks={section.tasks}
              title={section.name}
              id={section.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

BoardPage.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default BoardPage;
