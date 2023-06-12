import { useState } from "react";
import { useRouter } from "next/router";
import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { useOneProject } from "@/hooks/ProjectHooks";
import { NextPageWithLayout } from "../../_app";
import { Task } from "@prisma/client";
import Button from "@/components/UI/Button";
import TaskTableHead from "@/components/task/TaskTableHead";
import SectionListView from "@/components/sections/SectionListView";
import { useSectionsOfUser } from "@/hooks/SectionHooks";
import AddSectionButton from "@/components/sections/AddSectionButton";

const List: NextPageWithLayout = () => {
  const { userAssignedTasksSection, userSections, status } =
    useSectionsOfUser();
  const { projectId } = useRouter().query;
  const { project, status: projectStatus } = useOneProject(projectId as string);
  console.log("Project in list: ", project);
  console.log("Sections: ", project?.sections);
  return (
    <div className="project-page__list">
      {projectStatus === "error" && (
        <div>
          <h1>Error</h1>
          <p>Try to refresh the page.</p>
        </div>
      )}

      {projectStatus === "loading" && <div>Loading...</div>}

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
  );
};

List.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default List;
