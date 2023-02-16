import React, { useState } from "react";
import PageHeader from "@/components/header/PageHeader";
import { useProjects } from "@/hooks/ProjectHooks";
import Projects from "@/components/project/Projects";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { useWorkspaceWithProjects } from "@/hooks/WorkspaceHooks";
import LoadingSkeleton from "@/components/UI/LoadingSkeleton";
import UserCard from "@/components/UI/UserCard";

const WorkspacePage = () => {
  const { workspace, projects, status } = useWorkspaceWithProjects();

  console.log("projects: ", projects);
  console.log("workspace ", workspace);
  console.log("members ", workspace?.members);
  return (
    <>
      <PageHeader title={workspace?.name ?? "Loading..."} />

      <div className="page workspace-page">
        <div className="workspace__sections">
          <div className="workspace__section">
            <h2 className="workspace__section-header">About us</h2>
            <div className="workspace__description">
              <textarea
                className="workspace__description-input"
                placeholder="Click here to add your team's description."
                // type="text"
                defaultValue={workspace?.description ?? ""}
              />
            </div>
          </div>
          <div className="workspace__section">
            {status === "loading" && <LoadingSkeleton />}
            {status === "success" && (
              <h2 className="workspace__section-header">
                Members ({workspace?.members.length!})
              </h2>
            )}

            <div className="workspace__members">
              {workspace?.members.map((member) => (
                <UserCard key={member.id} name={member.name!} id={member.id} />
              ))}
            </div>
          </div>
          <div className="workspace__section">
            <h2 className="workspace__section-header">Projects</h2>
            <div>
              {status === "loading" && (
                <div className="center">
                  <LoadingSpinner />
                </div>
              )}
              {status === "success" && <Projects projects={projects!} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkspacePage;
