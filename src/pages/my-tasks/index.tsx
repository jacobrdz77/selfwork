import { NextPage } from "next";
import PageHeader from "@/components/header/PageHeader";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import SectionListView from "@/components/sections/SectionListView";
import { useCallback, useEffect, useRef, useState } from "react";
import TaskHeadCell from "@/components/task/TaskHeadCell";

const MyTasksPage: NextPage = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();

  return (
    <>
      <PageHeader title="Tasks" />
      <div className="page tasks-page">
        <TaskTableHead />

        {status === "success" && (
          <>
            {/* User assigned section. This cannot be deleted because this is where assigned tasks go to. */}
            <SectionListView
              isUserAssignedSection={true}
              section={userAssignedTasksSection!}
              tasks={userAssignedTasksSection?.tasks ?? []}
            />

            {/* The rest of user sections */}
            {userSections?.map((section) => (
              <SectionListView
                key={section.id}
                section={section}
                tasks={section.tasks}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default MyTasksPage;

const TaskTableHead = () => {
  return (
    <div className="tasks-header">
      <div className="tr">
        <TaskHeadCell width={400} minWidth={400} maxWidth={800}>
          Task Name
        </TaskHeadCell>
        <TaskHeadCell width={120} minWidth={120} maxWidth={300}>
          Assignee
        </TaskHeadCell>
        <TaskHeadCell width={120} minWidth={120} maxWidth={300}>
          Due Date
        </TaskHeadCell>
        <TaskHeadCell width={120} minWidth={120} maxWidth={300}>
          Status
        </TaskHeadCell>
        <TaskHeadCell width={120} minWidth={120} maxWidth={300}>
          Priority
        </TaskHeadCell>
      </div>
    </div>
  );
};
