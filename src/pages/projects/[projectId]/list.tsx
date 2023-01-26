import { useRouter } from "next/router";
import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import Tasks from "@/components/task/Tasks";
import { useOneProject } from "@/hooks/ProjectHooks";
import { ProjectWithTasks } from "@/types/types";
import { NextPageWithLayout } from "../../_app";

const List: NextPageWithLayout = () => {
  const { projectId } = useRouter().query;
  const { project, status } = useOneProject(projectId as string, true);

  return (
    <div className="project-page__list">
      {status === "error" && (
        <div>
          <h1>Error</h1>
          <p>Try to refresh the page.</p>
        </div>
      )}

      {status === "loading" && <div>Loading...</div>}

      {status === "success" && (
        <Tasks status={status} tasks={project?.tasks!} />
      )}
    </div>
  );
};

List.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default List;
