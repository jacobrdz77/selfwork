import LoadingBoardViewPage from "@/components/loading/LoadingBoardViewPage";
import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import Boards from "@/components/sections/Boards";
import { useSectionsOfProject } from "@/hooks/SectionHooks";
import useSortedSections from "@/hooks/useSortedSections";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";

const BoardPage: NextPageWithLayout = () => {
  const router = useRouter();
  // const currentPath = router.pathname.split("/")[3];
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
