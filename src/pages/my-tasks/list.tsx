import { NextPage } from "next";
import PageHeader from "@/components/header/PageHeader";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import TaskTableHead from "@/components/task/TaskTableHead";
import MyTaskNav from "@/components/header/MyTaskNav";
import SectionsList from "@/components/sections/SectionsList";
import { useSortedSections } from "@/hooks/SectionHooks";
import LoadingListViewPage from "@/components/loading/LoadingListViewPage";
import LoadingHeader from "@/components/loading/LoadingHeader";

const MyTaskListPage: NextPage = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();

  const { sortedSections, setSortedSections } = useSortedSections(
    userSections ? userSections : []
  );

  if (status === "loading") {
    return (
      <>
        <LoadingHeader />
        <LoadingListViewPage />
      </>
    );
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
      <PageHeader title="My Tasks">
        <MyTaskNav />
      </PageHeader>
      <div className="page tasks-page">
        <TaskTableHead />
        <div className="list-sections">
          {/* User assigned section. This cannot be deleted because this is where assigned tasks go to. */}
          {/* <SectionListView
                isUserAssignedSection={true}
                section={userAssignedTasksSection!}
              /> */}

          {/* The rest of user sections */}
          <SectionsList
            sections={sortedSections!}
            setSections={setSortedSections}
          />
        </div>
      </div>
    </>
  );
};

export default MyTaskListPage;
