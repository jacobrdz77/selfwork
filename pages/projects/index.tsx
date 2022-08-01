import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Header from "../../components/UI/Header";
import Layout from "../../components/Layout/Layout";
import ProjectCard from "../../components/ProjectCard";
import NoProjects from "../../components/NoProjects";

const ProjectsPage: NextPage = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const addProjectHandler = () => {};

  return (
    <>
      {/* Wrapper */}
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
                  clientId={project.clientId}
                  description={project.description}
                  clientName={project.clientName}
                />
              ))}
            </div>
          )}

          {projects.length === 0 && (
            <NoProjects buttonHandler={addProjectHandler} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
