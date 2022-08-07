import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import React, { useEffect, useState } from "react";
import Header from "../../components/UI/Header";
import Layout from "../../components/Layout/Layout";
import ProjectCard from "../../components/ProjectCard";
import NoProjects from "../../components/NoProjects";
import AddProjectModal from "../../components/AddProjectModal";
import { Project } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { addProjectModalFormSlice } from "../../src/store/store";
import { getProjects } from "../../src/lib/projectsFunctions";
import { getSession, useSession } from "next-auth/react";
import LoadingProjectPage from "../../components/Loading/LoadingProjectPage";

const ProjectsPage: NextPage<{ projects: Project[] }> = () => {
  const projectForm = useAppSelector((state) => state.addProjectModalForm);
  const { reset } = addProjectModalFormSlice.actions;
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const addProjectHandler = () => {
    setIsModalOpen(true);
  };

  const [projects, setProjects] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchData = async (userId: string) => {
      const projects = await getProjects(userId);
      setProjects(projects);
    };
    fetchData("cl6e7qn2t0132h9gphqc29xl2");
  }, []);

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
          buttonHandler={addProjectHandler}
        >
          <div className="text-[14px]">
            <button className="h-full ml-2 border-2 border-button rounded-[5px] p-1">
              Sort By
            </button>
          </div>
        </Header>
        <hr className="mt-4" />
        {/* Filter buttons */}

        {/* Loading Spinner */}
        {!projects && (
          <div className="w-full h-full flex justify-center items-center mt-auto">
            <LoadingProjectPage />
          </div>
        )}

        {/* Grid of projects */}
        <div className="mt-10">
          {projects && projects.length > 0 && (
            <div className="flex gap-4 flex-wrap">
              {projects &&
                projects.map((project) => (
                  <ProjectCard
                    title={project.name}
                    key={project.id}
                    projectId={project.id}
                    clientId={project.clientId}
                    description={project.description}
                  />
                ))}
            </div>
          )}

          <>
            <NoProjects buttonHandler={addProjectHandler} />
          </>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
