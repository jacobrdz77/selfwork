import React, { useEffect, useState } from "react";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
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

const ProjectsPage: NextPage<{ projects: Project[] }> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectForm = useAppSelector((state) => state.addProjectModalForm);
  const { reset } = addProjectModalFormSlice.actions;
  const dispatch = useAppDispatch();
  // const [projects, setProjects] = useState<any[] | null>(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState('cl6saletw002362gpbq4yq7o7"');

  const openProjectModal = () => {
    setIsModalOpen(true);
  };

  const {
    data: projects,
    isLoading,
    isError,
  } = useQuery(["projects", userId], () => getProjects(userId));

  // useEffect(() => {
  //   // const fetchProjects = async (userId: string) => {
  //   //   setIsLoading(true);
  //   //   const response = await fetch(`/api/projects/${userId}`);
  //   //   const projects = await response.json();
  //   //   setProjects(projects);
  //   //   setIsLoading(false);
  //   // };
  //   // fetchProjects("cl6saletw002362gpbq4yq7o7");
  //   const fetchProjects = async () => {
  //     setIsLoading(true);
  //     const projects = await getProjects("cl6saletw002362gpbq4yq7o7");
  //     setProjects(projects);
  //     setIsLoading(false);
  //   };
  //   fetchProjects();
  // }, []);

  return (
    <>
      {/* Wrapper */}
      <AddProjectModal
        closeHandler={() => {
          dispatch(reset());
          setIsModalOpen(false);
        }}
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <div className="h-full py-5 px-7">
        <Header
          button={true}
          buttonText="Add Project"
          title="Projects"
          buttonHandler={openProjectModal}
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
          <NoProjects buttonHandler={openProjectModal} />
        )}
        {/* Grid of projects */}
        <div className="mt-10">
          <div className="flex gap-4 flex-wrap">
            {projects &&
              !isLoading &&
              projects.map((project: Project) => (
                <ProjectCard
                  title={project.name}
                  key={project.id}
                  projectId={project.id}
                  clientId={project.clientId}
                  description={project.description}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
