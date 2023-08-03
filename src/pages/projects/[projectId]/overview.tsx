import { useRouter } from "next/router";
import { useState } from "react";
import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { useOneProject } from "@/hooks/ProjectHooks";
import { NextPageWithLayout } from "../../_app";
import Image from "next/image";
import { getInitials } from "@/components/UI/UserCard";
import useMenu from "@/hooks/useMenu";
import AddLinkPopup from "@/components/project/AddLinkPopup";
import { useLinks } from "@/hooks/LinkHook";
import ProjectLinks from "@/components/project/ProjectLinks";
import ProjectDescription from "@/components/project/ProjectDescription";
import Link from "next/link";
import InviteMemberPopup from "@/components/member/InviteMemberPopup";

const ProjectOverviewPage: NextPageWithLayout = () => {
  const { projectId } = useRouter().query;
  const { project, status } = useOneProject(projectId as string);
  const { isMenuOpen, btnRef, menuRef, setIsMenuOpen } = useMenu();
  const {
    isMenuOpen: isMembersMenuOpen,
    btnRef: memberBtnRef,
    menuRef: memberMenuRef,
    setIsMenuOpen: setMemberMenuOpen,
  } = useMenu();
  console.log("Project in overview: ", project?.name);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return (
      <div>
        <h1>Error</h1>
        <p>Try to refresh the page.</p>
      </div>
    );
  }
  return (
    <div className="project-page__overview">
      <div className="project-page__overview-description">
        <h2>Description</h2>
        {status === "success" && (
          <ProjectDescription
            projectId={project?.id!}
            initialDescription={project?.description!}
          />
        )}
      </div>
      <div className="project-members">
        <h2>Members</h2>
        <div className="members">
          {/* ADD Button */}
          <div className="project-resources__add-btn-container">
            <div
              ref={memberBtnRef}
              onClick={(e) => {
                e.preventDefault();
                setMemberMenuOpen(true);
              }}
              className="project-resources__add-btn project-resources__add-btn--members"
              role="button"
            >
              <div className="project-resources__add-icon">
                <svg viewBox="0 0 24 24">
                  <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z"></path>
                </svg>
              </div>
              <div
                className={`project-resource__tooltip ${
                  isMenuOpen ? "project-resource__tooltip--active" : ""
                }`}
              >
                <span>Invite Member</span>
              </div>
            </div>
            {isMembersMenuOpen && (
              <InviteMemberPopup
                isOpen={isMembersMenuOpen}
                menuRef={memberMenuRef}
                setIsOpen={setMemberMenuOpen}
                projectId={projectId as string}
                projectName={project?.name!}
              />
            )}

            {/* <InviteMemberPopup
              menuRef={memberMenuRef}
              setIsOpen={setMemberMenuOpen}
              projectId={projectId}
            /> */}
          </div>

          {project?.members.map((member) => (
            <Link
              href={`/profile/${member.id}`}
              key={member.id}
              className="one-member"
            >
              {member.image ? (
                <Image
                  className="one-member__image"
                  src={member.image ? member.image : ""}
                  alt="Profile picture"
                />
              ) : (
                <div className="one-member__initials">
                  {getInitials(member.name!)}
                </div>
              )}

              <span className="one-member__name">{member.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="project-resources">
        <h2>Key resources</h2>
        <div className="resources">
          {/* ADD Button */}
          <div className="project-resources__add-btn-container">
            <div
              ref={btnRef}
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen((state) => !state);
              }}
              className="project-resources__add-btn"
              role="button"
            >
              <div className="project-resources__add-icon">
                <svg viewBox="0 0 24 24">
                  <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z"></path>
                </svg>
              </div>
              <div
                className={`project-resource__tooltip ${
                  isMenuOpen ? "project-resource__tooltip--active" : ""
                }`}
              >
                <span>Add a link</span>
              </div>
            </div>
            {isMenuOpen && (
              <AddLinkPopup
                menuRef={menuRef}
                setIsOpen={setIsMenuOpen}
                projectId={projectId as string}
              />
            )}
          </div>

          {/* Links */}

          {/* {status === "success" && (
            <div className="loading__links">
              <div className="link"></div>
              <div className="link"></div>
              <div className="link"></div>
            </div>
          )} */}

          {status === "success" && <ProjectLinks links={project?.urlLinks} />}
        </div>
      </div>
    </div>
  );
};

ProjectOverviewPage.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default ProjectOverviewPage;
