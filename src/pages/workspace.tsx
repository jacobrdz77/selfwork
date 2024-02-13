import React, { FocusEvent, useState } from "react";
import PageHeader from "@/components/header/PageHeader";
import { useProjects } from "@/hooks/ProjectHooks";
import Projects from "@/components/project/Projects";
import { useOneWorkspace, useUpdateWorkspace } from "@/hooks/WorkspaceHooks";
import LoadingSkeleton from "@/components/UI/LoadingSkeleton";
import { useModalStore } from "store/user";
import useMenu from "@/hooks/useMenu";
import AvatarCard from "@/components/user/AvatarCard";
import { InviteMemberWorkspace } from "@/components/member/InviteMember";

const WorkspacePage = () => {
  const { workspace, status } = useOneWorkspace();
  const { projects } = useProjects();
  const { isMenuOpen, btnRef, menuRef, setIsMenuOpen } = useMenu();
  const setIsProjectModalOpen = useModalStore(
    (state) => state.setIsAddProjectModalOpen
  );

  const isInviteMemberWorkspaceModalOpen = useModalStore(
    (state) => state.isInviteMemberWorkspaceModalOpen
  );

  const setIsInviteMemberWorkspaceModalOpen = useModalStore(
    (state) => state.setIsInviteMemberWorkspaceModalOpen
  );

  // console.log("projects: ", projects);
  // console.log("workspace ", workspace);
  // console.log("members ", workspace?.members);
  return (
    <>
      <PageHeader title={workspace?.name ?? "Loading..."} />

      <div className="page workspace-page">
        <div className="workspace__sections">
          <div className="workspace__section">
            <div className="workspace__section-header">
              {status === "loading" && <LoadingSkeleton />}
              {status === "success" && <h2>About us</h2>}
            </div>

            <div className="workspace__description">
              {status === "loading" && <LoadingSkeleton />}
              {status === "success" && (
                <WorkspaceDescription
                  initialDescription={workspace?.description ?? ""}
                />
              )}
            </div>
          </div>
          <div className="workspace__section">
            <div className="workspace__section-header">
              {status === "loading" && <LoadingSkeleton />}
              {status === "success" && (
                <h2>Members ({workspace?.members.length! + 1})</h2>
              )}
            </div>

            <div className="workspace-members">
              {status === "success" && (
                <div className="workspace-members__add-container">
                  <div
                    ref={btnRef}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsInviteMemberWorkspaceModalOpen(true);
                    }}
                    className="workspace-members__add workspace-members__add--members"
                    role="button"
                  >
                    <div className="workspace-members__add-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z"></path>
                      </svg>
                    </div>
                    <div
                      className={`workspace-members__tooltip ${
                        isMenuOpen ? "workspace-members__tooltip--active" : ""
                      }`}
                    >
                      <span>Invite Member</span>
                    </div>
                  </div>
                </div>
              )}

              {status === "loading" && (
                <>
                  <LoadingSkeleton />
                  <LoadingSkeleton />
                  <LoadingSkeleton />
                </>
              )}

              {status === "success" && <AvatarCard user={workspace?.owner} />}

              {workspace?.members.map((member) => (
                <AvatarCard key={member.id} user={member} />
              ))}
            </div>
          </div>
          <div className="workspace__section">
            <div className="workspace__section-header">
              {status === "loading" && <LoadingSkeleton />}
              {status === "success" && <h2>Projects</h2>}
            </div>
            <div className="workspace__projects">
              {status === "loading" && (
                <div>
                  <LoadingSkeleton />
                  <LoadingSkeleton />
                  <LoadingSkeleton />
                </div>
              )}
              {status === "success" && (
                <>
                  <div
                    className="add-project-btn"
                    onClick={() => {
                      setIsProjectModalOpen(true);
                    }}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z"></path>
                    </svg>
                    New Project
                  </div>
                  <Projects projects={projects ? projects : []} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isInviteMemberWorkspaceModalOpen && (
        <InviteMemberWorkspace
          isOpen={isInviteMemberWorkspaceModalOpen}
          setIsOpen={setIsInviteMemberWorkspaceModalOpen}
          members={workspace?.members!}
          workspaceId={workspace?.id}
          owner={{
            id: workspace?.owner.id!,
            name: workspace?.owner.name!,
            image: workspace?.owner.image!,
          }}
          isDark={false}
        />
      )}
    </>
  );
};

export default WorkspacePage;

const WorkspaceDescription = ({
  initialDescription,
}: {
  initialDescription: string;
}) => {
  const [description, setDescription] = useState(initialDescription);
  const [oldDescription, setOldDescription] = useState(initialDescription);
  const { mutate: updateDescription } = useUpdateWorkspace();
  const handleDescriptionBlur = (
    e: FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    let trimmedDescription = e.currentTarget.value.trim();

    if (oldDescription === trimmedDescription) {
      setDescription(trimmedDescription);
      // console.log("NOPE");
      return;
    } else {
      updateDescription({
        description: trimmedDescription,
      });
      setDescription(trimmedDescription);
      setOldDescription(trimmedDescription);
    }
  };
  return (
    <textarea
      className="workspace__description-input"
      placeholder="Click here to add your team's description."
      value={description}
      onChange={(e) => {
        setDescription(e.currentTarget.value);
      }}
      onBlur={handleDescriptionBlur}
    />
  );
};
