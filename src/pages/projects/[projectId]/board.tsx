import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { NextPageWithLayout } from "../../_app";
import { useSectionsOfProject, useSectionsOfUser } from "@/hooks/SectionHooks";
import Boards from "@/components/sections/Boards";
import { useRouter } from "next/router";
import useSortedSections from "@/hooks/useSortedSections";
import LoadingSkeleton from "@/components/UI/LoadingSkeleton";
import LoadingBoardViewPage from "@/components/loading/LoadingBoardViewPage";

const BoardPage: NextPageWithLayout = () => {
  const router = useRouter();
  const currentPath = router.pathname.split("/")[3];
  const { projectId } = router.query;
  const { projectSections, status } = useSectionsOfProject(projectId as string);
  const { sortedSections, setSortedSections } = useSortedSections(
    projectSections ? projectSections : []
  );

  if (status === "loading") {
    return <LoadingBoardViewPage />;
  }

  if (status === "error") {
    return (
      <div>
        <h1>Error</h1>
        <p>Try to refresh the page.</p>
      </div>
    );
  }

  return (
    <>
      <div className="project-page__board">
        <Boards
          sections={sortedSections}
          // @ts-ignore
          setSections={setSortedSections}
          isProject={true}
          projectId={projectId as string}
        />
      </div>
    </>
  );
};

BoardPage.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default BoardPage;
