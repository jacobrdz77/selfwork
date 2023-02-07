import { NextPage } from "next";
import PageHeader from "@/components/header/PageHeader";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import SectionListView from "@/components/sections/SectionListView";
import Tasks from "@/components/task/Tasks";

const MyTasksPage: NextPage = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();
  return (
    <>
      <PageHeader title="Tasks" buttonText="Add Task" isButton={true} />
      <div className="page clients-page">
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Task name</th>
              <th>Due date</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
        </table>

        {/* {status === "loading" && <p>Loading...</p>} */}
        {status === "success" && (
          <SectionListView
            name={userAssignedTasksSection?.name ?? ""}
            tasks={userAssignedTasksSection?.tasks ?? []}
          />
        )}
        {status === "success" &&
          userSections?.map((section) => (
            <SectionListView
              key={section.id}
              name={section.name}
              tasks={section.tasks}
            />
          ))}
      </div>
    </>
  );
};

export default MyTasksPage;
