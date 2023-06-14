import { useRouter } from "next/router";
import { useState } from "react";
import ProjectPageLayout from "@/components/project/ProjectPageLayout";
import { useOneProject } from "@/hooks/ProjectHooks";
import { NextPageWithLayout } from "../../_app";
import Image from "next/image";
import { getInitials } from "@/components/UI/UserCard";
import Link from "next/link";
import useMenu from "@/hooks/useMenu";

const ProjectOverviewPage: NextPageWithLayout = () => {
  const { projectId } = useRouter().query;
  const { project, status } = useOneProject(projectId as string);
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  console.log("Project in overview: ", project);

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
        <p>{project?.description ?? "You're description would go here!"}</p>
      </div>
      <div className="project-members">
        <h2>Members</h2>
        <div className="members">
          {project?.members.map((member) => (
            <div key={member.id} className="one-member">
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
            </div>
          ))}
        </div>
      </div>
      <div className="project-resources">
        <h2>Key resources</h2>
        <div className="resources">
          <div className="project-resources__add-btn-container">
            <div
              ref={btnRef}
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="project-resources__add-btn"
              role="button"
            >
              <div className="project-resources__add-icon">
                <svg viewBox="0 0 24 24">
                  <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z"></path>
                </svg>
              </div>
              <div className="project-resource__tooltip">
                <span>Add a link</span>
              </div>
            </div>
          </div>
          {project?.links &&
            project?.links.map((link) => (
              <Link href={link} key={link} className="one-member">
                <span className="one-member__name">{link}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

ProjectOverviewPage.getLayout = function getLayout(page) {
  return <ProjectPageLayout>{page}</ProjectPageLayout>;
};

export default ProjectOverviewPage;
