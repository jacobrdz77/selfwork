import { NextPage } from "next";
import PageHeader from "@/components/header/PageHeader";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import SectionListView from "@/components/sections/SectionListView";
import TaskTableHead from "@/components/task/TaskTableHead";
import AddSectionButton from "@/components/sections/AddSectionButton";

const MyTasksPage: NextPage = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();

  return (
    <>
      <PageHeader title="My Tasks" />
      <div className="page tasks-page">
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

export default MyTasksPage;
