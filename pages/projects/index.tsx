import React, { useState } from "react";
import { NextPage } from "next";
import Header from "../../components/UI/Header";
import ProjectCard from "../../components/ProjectCard";
import NoProjects from "../../components/NoProjects";
import AddProjectModal from "../../components/AddProjectModal";
import { Project } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import addProjectModalFormSlice from "../../src/store/slices/addProjectFormSlice";
import { getProjects } from "../../src/lib/projectsFunctions";
import LoadingProjectPage from "../../components/Loading/LoadingProjectPage";
import { useQuery } from "@tanstack/react-query";

export type ProjectForProjectCard = Project & {
  client: {
    name: string;
  };
};

const ProjectsPage: NextPage<{ projects: Project[] }> = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const projectForm = useAppSelector((state) => state.addProjectModalForm);
  const { reset } = addProjectModalFormSlice.actions;
  const dispatch = useAppDispatch();
  // const [projects, setProjects] = useState<any[] | null>(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState('cl6saletw002362gpbq4yq7o7"');

  const { data: projects, isLoading } = useQuery(["projects", userId], () =>
    getProjects(userId)
  );

  return (
    <>
      <AddProjectModal
        closeHandler={() => {
          dispatch(reset());
          setIsAddProjectModalOpen(false);
        }}
        isOpen={isAddProjectModalOpen}
        setIsModalOpen={setIsAddProjectModalOpen}
      />
      {/* Wrapper */}
      <div className="h-full py-5 px-7">
        <Header
          button={true}
          buttonText="Add Project"
          title="Projects"
          buttonHandler={() => {
            setIsAddProjectModalOpen(true);
          }}
        >
          {/* Filter buttons */}
          <div className="text-[14px]">
            <button className="h-full ml-2 border-2 border-button rounded-[5px] px-3 py-1 tracking-wide ">
              Sort By
            </button>
          </div>
        </Header>
        <hr className="mt-4" />
        {/* Loading Spinner */}
        {isLoading && (
          <div className="w-full h-full flex justify-center mt-11">
            <LoadingProjectPage />
          </div>
        )}
        {!projects && !isLoading && (
          <NoProjects
            buttonHandler={() => {
              setIsAddProjectModalOpen(true);
            }}
          />
        )}
        {/* Grid of projects */}
        <div className="mt-10">
          <div className="flex gap-4 flex-wrap">
            {projects &&
              !isLoading &&
              projects.map((project: ProjectForProjectCard) => (
                <ProjectCard key={project.id} projectData={project} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
