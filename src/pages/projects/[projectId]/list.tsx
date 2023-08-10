import { useState } from "react";
import { useRouter } from "next/router";
import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { NextPageWithLayout } from "../../_app";
import TaskTableHead from "@/components/task/TaskTableHead";
import { useSectionsOfProject } from "@/hooks/SectionHooks";
import SectionsList from "@/components/sections/SectionsList";
import { useEffect } from "react";

const List: NextPageWithLayout = () => {
  const { projectId } = useRouter().query;
  const { projectSections, status } = useSectionsOfProject(projectId as string);

  const [sections, setSections] = useState(
    projectSections ? projectSections : []
  );

  useEffect(() => {
    setSections(projectSections ? projectSections : []);
  }, [projectSections]);

  return (
    <div className="project-page__list">
      {status === "error" && (
        <div>
          <h1>Error</h1>
          <p>Try to refresh the page.</p>
        </div>
      )}

      {status === "loading" && <div>Loading...</div>}

      {/* ADD button */}
      {/* <Button className="add-task-btn">
        <svg
          fill="currentColor"
          className="sidebar__add-icon"
          viewBox="0 0 24 24"
        >
          <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z" />
        </svg>
        Add Task
      </Button> */}

      {status === "success" && (
        <>
          <TaskTableHead />
          <SectionsList
            sections={sections ? sections : []}
            projectId={projectId as string}
            setSections={setSections}
          />
        </>
      )}
    </div>
  );
};

List.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default List;
