import React, { useId, useState } from "react";
import { NextPage, NextPageContext } from "next";
import Header from "../../components/UI/Header";
import NoProjects from "../../components/NoProjects";
import AddProjectModal from "../../components/AddProjectModal";
import { Project } from "@prisma/client";
import { getProjects } from "../../lib/projectsFunctions";
import LoadingProjectPage from "../../components/Loading/LoadingProjectPage";
import { useQuery } from "@tanstack/react-query";
import Button from "../../components/UI/Button";
import Projects from "../../components/Projects";
import { getSession, useSession } from "next-auth/react";
import { getUserId } from "../../lib/user";
import { getClients } from "../../lib/clientFunctions";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../../store/user";

export type ProjectForProjectCard = Project & {
  client: {
    name: string;
  };
};


const ProjectsPage: NextPage = () => {
  const userId = useAtomValue(userIdAtom);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const {
    data: projects,
    isLoading,
    status,
  } = useQuery(["projects", userId], () => getProjects(userId));
  const { data: clients } = useQuery(["clients"], () => getClients(userId));

  return (
    <>
      <AddProjectModal
        clients={clients}
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
