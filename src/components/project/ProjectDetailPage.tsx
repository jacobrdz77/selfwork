import { Project } from "@prisma/client";
import React from "react";

const ProjectDetailPage: React.FC<{ project: Project }> = ({ project }) => {
  console.log(project);
  return (
    <main>
      <h2>Detail Page</h2>
    </main>
  );
};

export default ProjectDetailPage;
