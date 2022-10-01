import React, { useState } from "react";
import { NextPage } from "next";
import Header from "../../components/UI/Header";
import ProjectCard from "../../components/ProjectCard";
import NoProjects from "../../components/NoProjects";
import AddProjectModal from "../../components/AddProjectModal";
import { Project } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { getProjects } from "../../src/lib/projectsFunctions";
import LoadingProjectPage from "../../components/Loading/LoadingProjectPage";
import { useQuery } from "@tanstack/react-query";
import Button from "../../components/UI/Button";
import Projects from "../../components/Projects";
import { useSession } from "next-auth/react";

export type ProjectForProjectCard = Project & {
  client: {
    name: string;
  };
};

const ProjectsPage: NextPage<{ projects: Project[] }> = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const {
    data: projects,
    isLoading,
    status,
  } = useQuery(["projects", user.id], () => getProjects(user.id));

  const { data: session } = useSession();
  console.log("Session data: ", session);

  return (
    <>
      <AddProjectModal
        isOpen={isAddProjectModalOpen}
        setIsModalOpen={setIsAddProjectModalOpen}
      />
      {/* Wrapper */}
      <div className="h-full py-5 px-7">
        <Header
          isButton={true}
          buttonText="Add Project"
          title="Projects"
          buttonHandler={() => {
            setIsAddProjectModalOpen(true);
          }}
        >
          {/* Filter buttons */}
          <Button>Sort By</Button>
        </Header>
        <hr className="mt-4" />
        {/* Loading Spinner */}
        {isLoading && (
          <div className="w-full h-full flex justify-center mt-11">
            <LoadingProjectPage />
          </div>
        )}
        {status === "success" && projects.length === 0 && (
          <NoProjects
            buttonHandler={() => {
              setIsAddProjectModalOpen(true);
            }}
          />
        )}
        {/* Grid of projects */}
        <Projects projects={projects} status={status} />
      </div>
    </>
  );
};

export default ProjectsPage;
