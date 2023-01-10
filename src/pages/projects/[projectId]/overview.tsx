import { useRouter } from "next/router";
import { useState } from "react";
import ProjectPageLayout from "../../../components/project/ProjectPageLayout";
import { useOneProject } from "../../../hooks/ProjectHooks";
import { NextPageWithLayout } from "../../_app";

const ProjectOverviewPage: NextPageWithLayout = () => {
  const { projectId } = useRouter().query;
  const { project, status } = useOneProject(projectId as string);

  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && (
        <div>
          <h1>Error</h1>
          <p>Try to refresh the page.</p>
        </div>
      )}
      {status === "success" && <p>{JSON.stringify(project)}</p>}
    </>
  );
};

ProjectOverviewPage.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default ProjectOverviewPage;
