import { useRouter } from "next/router";
import { useState } from "react";
import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { useOneProject } from "@/hooks/ProjectHooks";
import { NextPageWithLayout } from "../../_app";

const ProjectOverviewPage: NextPageWithLayout = () => {
  const { projectId } = useRouter().query;
  const { project, status } = useOneProject(projectId as string);
  console.log("Project in overview: ", project);

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
    <div className="project-page__overview">
      <h2>Description</h2>
      <p>{project?.description ?? "You're description would go here!"}</p>
    </div>
  );
};

ProjectOverviewPage.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default ProjectOverviewPage;
