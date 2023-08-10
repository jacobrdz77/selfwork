import { NextPage } from "next";
import PageHeader from "@/components/header/PageHeader";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import TaskTableHead from "@/components/task/TaskTableHead";
import MyTaskNav from "@/components/header/MyTaskNav";
import SectionsList from "@/components/sections/SectionsList";
import useSortedSections from "@/hooks/useSortedSections";

const MyTaskListPage: NextPage = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();

  const { sortedSections, setSortedSections } = useSortedSections(
    userSections ? userSections : []
  );

  return (
    <>
      <PageHeader title="My Tasks">
        <MyTaskNav />
      </PageHeader>
      <div className="page tasks-page">
        {status === "success" && (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default MyTaskListPage;
