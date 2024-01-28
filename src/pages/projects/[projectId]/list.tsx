import { useRouter } from "next/router";
import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { NextPageWithLayout } from "../../_app";
import TaskTableHead from "@/components/task/TaskTableHead";
import { useSectionsOfProject } from "@/hooks/SectionHooks";
import SectionsList from "@/components/sections/SectionsList";
import useSortedSections from "@/hooks/useSortedSections";
import LoadingListViewPage from "@/components/loading/LoadingListViewPage";

const List: NextPageWithLayout = () => {
  const { projectId } = useRouter().query;
  const { projectSections, status } = useSectionsOfProject(projectId as string);

  const { sortedSections, setSortedSections } = useSortedSections(
    projectSections ? projectSections : []
  );

  if (status === "loading") {
    return <LoadingListViewPage />;
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
      <div className="project-page__list">
        <TaskTableHead />
        <SectionsList
          sections={sortedSections}
          projectId={projectId as string}
          setSections={setSortedSections}
        />
      </div>
    </>
  );
};

List.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default List;
