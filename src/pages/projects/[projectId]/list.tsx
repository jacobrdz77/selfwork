import { useState } from "react";
import { useRouter } from "next/router";
import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { useOneProject } from "@/hooks/ProjectHooks";
import { NextPageWithLayout } from "../../_app";
import { Task } from "@prisma/client";

const List: NextPageWithLayout = () => {
  const { projectId } = useRouter().query;
  const { project, status } = useOneProject(projectId as string);
  console.log("Project in list: ", project);
  console.log("Sections: ", project?.sections);
  return (
    <div className="project-page__list">
      {status === "error" && (
        <div>
          <h1>Error</h1>
          <p>Try to refresh the page.</p>
        </div>
      )}

      {status === "loading" && <div>Loading...</div>}

      {/* {status === "success" && (
          Add a Sections component
      )} */}
    </div>
  );
};

List.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default List;
