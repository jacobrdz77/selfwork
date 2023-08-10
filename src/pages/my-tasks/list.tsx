import { useState, useEffect } from "react";
import { NextPage } from "next";
import PageHeader from "@/components/header/PageHeader";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import SectionListView from "@/components/sections/SectionListView";
import TaskTableHead from "@/components/task/TaskTableHead";
import MyTaskNav from "@/components/header/MyTaskNav";
import SectionsList from "@/components/sections/SectionsList";
import { SectionWithTasks } from "@/types/types";

const MyTaskListPage: NextPage = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();

  const [sections, setSections] = useState(userSections ? userSections : []);

  useEffect(() => {
    setSections(userSections!);
  }, [userSections]);

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
              <SectionsList sections={sections!} setSections={setSections} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyTaskListPage;
