import { useRouter } from "next/router";
import ProjectPageLayout from "../../../components/project/ProjectPageLayout";
import { useOneProject } from "../../../hooks/ProjectHooks";
import { ProjectWithTasks } from "../../../types/types";
import { NextPageWithLayout } from "../../_app";

const List: NextPageWithLayout = () => {
  const { projectId } = useRouter().query;
  const { project, status } = useOneProject(projectId as string, true);
  console.log("Project with tasks: ", project);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return (
      <div>
        <h1>Error</h1>
        <p>Try to refresh the page.</p>
      </div>
    );
  }

  return (
    <div className="project-page__list">
      <h2>Tasks</h2>
      <div>
        {project?.tasks?.map((task) => (
          <p key={task.id}>{task.name}</p>
        ))}
      </div>
    </div>
  );
};

List.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default List;
