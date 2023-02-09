import { NextPage } from "next";
import PageHeader from "@/components/header/PageHeader";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import SectionListView from "@/components/sections/SectionListView";

const MyTasksPage: NextPage = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();
  return (
    <>
      <PageHeader title="Tasks" />
      <div className="page tasks-page">
        {/* <table className="tasks-table">
          <thead>
            <tr>
              <th>Task name</th>
              <th>Due date</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
        </table> */}

        {status === "loading" && <p>Loading...</p>}

        {/* User assigned section. This cannot be deleted because this is where assigned tasks go to. */}
        {status === "success" && (
          <SectionListView
            isUserAssignedSection={true}
            section={userAssignedTasksSection!}
            tasks={userAssignedTasksSection?.tasks ?? []}
          />
        )}
        {status === "success" &&
          userSections?.map((section) => (
            <SectionListView
              key={section.id}
              section={section}
              tasks={section.tasks}
            />
          ))}
      </div>
    </>
  );
};

export default MyTasksPage;
