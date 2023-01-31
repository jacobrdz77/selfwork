import { useState } from "react";
import { NextPage } from "next";
import PageHeader from "@/components/header/PageHeader";
import NoProjects from "@/components/project/NoProjects";
import AddProjectModal from "@/components/project/AddProjectModal";
import Button from "@/components/UI/Button";
import Projects from "@/components/project/Projects";
import { useProjects } from "@/hooks/ProjectHooks";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

const ProjectsPage: NextPage = () => {
  const { projects, status } = useProjects();
  console.log("projects: ", projects);
  console.log("status: ", status);

  return (
    <>
      {/* Wrapper */}
      <PageHeader title="Projects"></PageHeader>

      <div className="page project-page">
        {status === "loading" && (
          <div>
            <LoadingSpinner />
          </div>
        )}
        {status === "success" && projects?.length === 0 && <NoProjects />}
        {status === "error" && (
          <div>
            <h1>Error</h1>
            <p>Try to refresh the page.</p>
          </div>
        )}
        {status === "success" && <Projects projects={projects!} />}
      </div>
    </>
  );
};

export default ProjectsPage;
