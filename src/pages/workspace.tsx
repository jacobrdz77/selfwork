import React, { useState, Suspense } from "react";
import PageHeader from "@/components/header/PageHeader";
import { useProjects } from "@/hooks/ProjectHooks";
import Projects from "@/components/project/Projects";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { useWorkspace } from "@/hooks/WorkspaceHooks";
import AddProjectModal from "@/components/project/AddProjectModal";
import LoadingSkeleton from "@/components/UI/LoadingSkeleton";
import UserCard from "@/components/UI/UserCard";

const WorkspacePage = () => {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const { projects, status } = useProjects();
  const { workspace, status: workspaceStatus } = useWorkspace();

  console.log("projects: ", projects);
  console.log("workspace ", workspace);
  return (
    <>
      {isAddProjectModalOpen && (
        <AddProjectModal
          isOpen={isAddProjectModalOpen}
          setIsModalOpen={setIsAddProjectModalOpen}
        />
      )}
      <PageHeader
        title={workspace?.name}
        isButton={true}
        buttonText="Create Project"
        buttonHandler={() => setIsAddProjectModalOpen(true)}
      />

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
            {workspaceStatus === "loading" && <LoadingSkeleton />}
            {workspaceStatus === "success" && (
              <h2 className="workspace__section-header">
                Members ({workspace?.members.length!})
              </h2>
            )}

            <div className="workspace__members">
              {workspace?.members.map((member) => (
                <UserCard
                  key={member.id}
                  name={member.name!}
                  id={member.id}
                  color="Purple"
                />
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
