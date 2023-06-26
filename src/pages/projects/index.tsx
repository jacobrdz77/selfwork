import { useState } from "react";
import { NextPage } from "next";
import PageHeader from "@/components/header/PageHeader";
import NoProjects from "@/components/project/NoProjects";
import Button from "@/components/UI/Button";
import Projects from "@/components/project/Projects";
import { useProjects } from "@/hooks/ProjectHooks";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { useModalStore } from "store/user";

const ProjectsPage: NextPage = () => {
  const { projects, status } = useProjects();
  // const [searchProject, setSearchProject] = useState("");
  const setIsProjectModalOpen = useModalStore(
    (state) => state.setIsAddProjectModalOpen
  );

  return (
    <>
      {/* Wrapper */}
      <PageHeader title="Projects" />

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
        {/* <div className="inputs">
          <div className="search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="icon"
            >
              <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>

            <input
              value={searchProject}
              onChange={(e) => {
                setSearchProject(e.target.value);
              }}
              className="input"
              type="text"
              placeholder="Search"
            />
          </div>
        </div> */}

        {status === "success" && (
          <>
            <div
              className="add-project-btn"
              onClick={() => {
                setIsProjectModalOpen(true);
              }}
            >
              <svg viewBox="0 0 24 24">
                <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z"></path>
              </svg>
              New Project
            </div>
            <Projects projects={projects!} />
          </>
        )}
      </div>
    </>
  );
};

export default ProjectsPage;
