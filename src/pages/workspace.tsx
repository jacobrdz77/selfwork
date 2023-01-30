import React, { useState, Suspense } from "react";
import PageHeader from "@/components/header/PageHeader";
import { useProjects } from "@/hooks/ProjectHooks";
import Projects from "@/components/project/Projects";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { useWorkspace } from "@/hooks/WorkspaceHooks";
import AddProjectModal from "@/components/project/AddProjectModal";
import LoadingSkeleton from "@/components/UI/LoadingSkeleton";

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
      <PageHeader title={workspace?.name} />

      <div className="page workspace-page">
        <div className="workspace__section">
          <h2 className="workspace__section-heading">About us</h2>
          <div>
            <input
              className="workspace__input"
              type="text"
              defaultValue={workspace?.description ?? ""}
            />
          </div>
        </div>
        <div className="workspace__section">
          {workspaceStatus === "loading" && <LoadingSkeleton />}
          {workspaceStatus === "success" && (
            <h2>
              Members ({workspace?.members.length! + (workspace?.owner! && 1)})
            </h2>
          )}

          <div>{"Flex container of members"}</div>
        </div>
        <div className="workspace__section">
          <h2>Projects</h2>
          <div>
            {status === "loading" && (
              <div className="center">
                <LoadingSpinner />
              </div>
            )}
            {/* Grid of projects */}
            {status === "success" && <Projects projects={projects!} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkspacePage;
