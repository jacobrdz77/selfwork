import { NextPage } from "next";
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
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const ProjectsPage: NextPage = () => {
  const { data: session } = useSession();
  //usequery to get all projects using the userid
  // const { data: projects, isLoading } = useQuery(
  //   ["projects", { userId: "cl6e7qn2t0132h9gphqc29xl2" }],
  //   async () => {
  //     return await fetch("/api/projects", {
  //       method: "GET",
  //       headers: {
  //         "Content-type": "applicatoin/json",
  //       },
  //       body: {
  //         //@ts-ignore
  //         userId,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => data.data);
  //   }
  // );

  const projects = [
    {
      id: "1",
      name: "Project 1",
      description: "This is project 1",
      clienId: "Client 1",
      clienName: "John Doe",
    },
    {
      id: "2",
      name: "Project 2",
      description: "This is project 2",
      clienId: "Client 1",
      clienName: "Jimmy John",
    },
    {
      id: "3",
      name: "Project 3",
      description: "This is project 3",
      clienId: "Client 1",
      clienName: "Steven Smith",
    },
  ];

  const projectForm = useAppSelector((state) => state.addProjectModalForm);
  const { reset } = addProjectModalFormSlice.actions;
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const addProjectHandler = () => {
    setIsModalOpen(true);
  };

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

        <div className="mt-10">
          {/* Grid of projects */}
          {projects.length !== 0 && (
            <div className="flex gap-4 flex-wrap">
              {projects.map((project) => (
                <ProjectCard
                  title={project.name}
                  key={project.id}
                  projectId={project.id}
                  clientId={project.clienId}
                  description={project.description}
                  clientName={project.clienName}
                />
              ))}
            </div>
          )}

          {projects?.length === 0 && (
            <>
              <NoProjects buttonHandler={addProjectHandler} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
