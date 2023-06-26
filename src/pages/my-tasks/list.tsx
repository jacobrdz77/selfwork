import { NextPage } from "next";
import PageHeader from "@/components/header/PageHeader";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import SectionListView from "@/components/sections/SectionListView";
import TaskTableHead from "@/components/task/TaskTableHead";
import AddSectionButton from "@/components/sections/AddSectionButton";
import Button from "@/components/UI/Button";
import MyTaskNav from "@/components/header/MyTaskNav";

const MyTaskListPage = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();

  return (
    <>
      <PageHeader title="My Tasks">
        <MyTaskNav />
      </PageHeader>
      <div className="page tasks-page">
        <Button className="add-task-btn">
          <svg
            fill="currentColor"
            className="sidebar__add-icon"
            viewBox="0 0 24 24"
          >
            <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z" />
          </svg>
          Add Task
        </Button>
        {status === "success" && (
          <>
            <TaskTableHead />

            {/* User assigned section. This cannot be deleted because this is where assigned tasks go to. */}
            <SectionListView
              isUserAssignedSection={true}
              section={userAssignedTasksSection!}
            />

            {/* The rest of user sections */}
            {userSections?.map((section) => (
              <SectionListView key={section.id} section={section} />
            ))}
            <AddSectionButton />
          </>
        )}
      </div>
    </>
  );
};

export default MyTaskListPage;
