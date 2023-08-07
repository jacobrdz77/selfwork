import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useMenu from "@/hooks/useMenu";
import { useDeleteProject, useUpdateProject } from "@/hooks/ProjectHooks";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import { useModalStore } from "store/user";
import { ProjectWithAll } from "@/types/types";
import { Color, Project, ProjectStatus } from "@prisma/client";

type HeaderProps = {
  name: string | undefined;
  status: "error" | "success" | "loading";
  project: ProjectWithAll;
};

const ProjectHeader: React.FC<HeaderProps> = ({ name, status, project }) => {
  const router = useRouter();
  const currentPath = router.pathname.split("/")[3];
  const { projectId } = router.query;

  const setIsEditProjectModalOpen = useModalStore(
    (state) => state.setIsEditProjectModalOpen
  );

  const { mutate } = useDeleteProject();
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const [projectStatus, setProjectStatus] = useState(project.status);

  useEffect(() => {
    setProjectStatus(project.status);
  }, [project]);

  return (
    <>
      {status === "loading" && <LoadingProjectHeader />}
      {status === "success" && (
        <header className="project-header">
          <div className="project-header__top">
            <ColorMenu
              currColor={project.iconColor}
              projectId={projectId as string}
            />
            <h1 className="project-header__title">{name}</h1>
            <div className="project-header__button-container">
              <button
                ref={btnRef}
                className="project-header__button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen((state) => !state);
                }}
              >
                <svg
                  className={`project-header__button-icon ${
                    isMenuOpen ? "project-header__button-icon--active" : ""
                  }`}
                  viewBox="0 0 6.3499999 6.3500002"
                >
                  <g id="layer1" transform="translate(0 -290.65)">
                    <path d="m2.2580394 291.96502a.26460982.26460982 0 0 0 -.1741496.46871l1.6190225 1.38699-1.6190225 1.38648a.26460982.26460982 0 1 0 .3436483.40049l1.8536335-1.58595a.26460982.26460982 0 0 0 0-.40256l-1.8536335-1.5875a.26460982.26460982 0 0 0 -.1694987-.0667z" />
                  </g>
                </svg>
              </button>
              <div
                className={`project-header__menu ${
                  isMenuOpen ? "project-header__menu--active" : ""
                }`}
                ref={menuRef}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <div
                  className="project-header__menu-item"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsEditProjectModalOpen(true);
                  }}
                >
                  Edit project details
                </div>
                <div
                  className="project-header__menu-item project-card__edit-menu-item--delete"
                  onClick={() => {
                    setIsMenuOpen(false);
                    mutate(projectId as string);
                    router.push("/my-tasks/board");
                  }}
                >
                  Delete project
                </div>
              </div>
            </div>
            <StatusButton
              status={projectStatus}
              setStatus={setProjectStatus}
              project={project}
            />
          </div>
          <nav>
            <ul className="project-header__nav">
              <li>
                <Link
                  href={`/projects/${projectId}/overview`}
                  className={`project-header__nav-link ${
                    currentPath === "overview"
                      ? "project-header__nav-link--active"
                      : ""
                  }`}
                >
                  Overview
                </Link>
              </li>
              <li>
                <Link
                  href={`/projects/${projectId}/list`}
                  className={`project-header__nav-link ${
                    currentPath === "list"
                      ? "project-header__nav-link--active"
                      : ""
                  }`}
                >
                  List
                </Link>
              </li>
              <li>
                <Link
                  href={`/projects/${projectId}/board`}
                  className={`project-header__nav-link ${
                    currentPath === "board"
                      ? "project-header__nav-link--active"
                      : ""
                  }`}
                >
                  Board
                </Link>
              </li>
              <li>
                <Link
                  href={`/projects/${projectId}/sketch`}
                  className={`project-header__nav-link ${
                    currentPath === "sketch"
                      ? "project-header__nav-link--active"
                      : ""
                  }`}
                >
                  Sketch
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
};
export default ProjectHeader;

const LoadingProjectHeader = () => {
  return (
    <div className="project-loading">
      <div className="project-header__name">
        <LoadingSkeleton />
      </div>
      <nav>
        <ul className="project-header__nav">
          <li>
            <LoadingSkeleton />
          </li>
          <li>
            <LoadingSkeleton />
          </li>
          <li>
            <LoadingSkeleton />
          </li>
          <li>
            <LoadingSkeleton />
          </li>
        </ul>
      </nav>
    </div>
  );
};

const ColorMenu = ({
  currColor,
  projectId,
}: {
  currColor: Color;
  projectId: string;
}) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const [projectColor, setProjectColor] = useState<string | null>(currColor);
  // console.log("CURRENT COLOR: ", projectColor);

  const { mutate: updateProject } = useUpdateProject();

  useEffect(() => {
    const submitHandler = async () => {
      updateProject({
        projectId,
        projectData: {
          iconColor: projectColor,
        },
      });
    };

    submitHandler();
  }, [projectColor, projectId, updateProject]);
  useEffect(() => {
    switch (currColor) {
      case "OrangeYellow":
        setProjectColor("orange-yellow");
        break;
      case "YellowGreen":
        setProjectColor("yellow-green");
        break;
      case "Forest":
        setProjectColor("forest");
        break;
      case "BlueGreen":
        setProjectColor("blue-green");
        break;
      case "Aqua":
        setProjectColor("aqua");
        break;
      case "Blue":
        setProjectColor("blue");
        break;
      case "Purple":
        setProjectColor("purple");
        break;
      case "PinkPurple":
        setProjectColor("pink-purple");
        break;
      case "Pink":
        setProjectColor("pink");
        break;
      case "Oat":
        setProjectColor("oat");
        break;
    }
  }, [currColor]);
  return (
    <div className="menu-button-container color-menu__button-container">
      <button
        ref={btnRef}
        onClick={(e) => {
          e.preventDefault();
          setIsMenuOpen((state) => !state);
        }}
      >
        <svg
          className={`project-header__icon sidebar__color-icon--${projectColor} color-menu__button-icon`}
          viewBox="0 0 24 24"
        >
          <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
        </svg>
      </button>
      <div
        className={`menu color-menu ${isMenuOpen ? "color-menu--active" : ""}`}
        ref={menuRef}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div className="row">
          <div
            className={`color-menu__item project-header__icon sidebar__color-icon--blue`}
            onClick={() => {
              setIsMenuOpen(false);
              setProjectColor("blue");
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
          </div>
          <div
            className={`color-menu__item project-header__icon sidebar__color-icon--purple`}
            onClick={() => {
              setIsMenuOpen(false);
              setProjectColor("purple");
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
          </div>
          <div
            className={`color-menu__item project-header__icon sidebar__color-icon--pink-purple`}
            onClick={() => {
              setIsMenuOpen(false);
              setProjectColor("pink-purple");
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
          </div>
          <div
            className={`color-menu__item project-header__icon sidebar__color-icon--pink`}
            onClick={() => {
              setIsMenuOpen(false);
              setProjectColor("pink");
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
          </div>
          <div
            className={`color-menu__item project-header__icon sidebar__color-icon--classic`}
            onClick={() => {
              setIsMenuOpen(false);
              setProjectColor("");
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
          </div>
        </div>
        <div className="row">
          <div
            className={`color-menu__item project-header__icon sidebar__color-icon--oat`}
            onClick={() => {
              setIsMenuOpen(false);
              setProjectColor("oat");
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
          </div>
          <div
            className={`color-menu__item project-header__icon sidebar__color-icon--maroon`}
            onClick={() => {
              setIsMenuOpen(false);
              setProjectColor("maroon");
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
          </div>
          <div
            className={`color-menu__item project-header__icon sidebar__color-icon--orange-yellow`}
            onClick={() => {
              setIsMenuOpen(false);
              setProjectColor("orange-yellow");
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
          </div>
          <div
            className={`color-menu__item project-header__icon sidebar__color-icon--forest`}
            onClick={() => {
              setIsMenuOpen(false);
              setProjectColor("forest");
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
          </div>
          <div
            className={`color-menu__item project-header__icon sidebar__color-icon--blue-green`}
            onClick={() => {
              setIsMenuOpen(false);
              setProjectColor("blue-green");
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusButton = ({
  status,
  setStatus,
  project,
}: {
  status: ProjectStatus;
  setStatus: React.Dispatch<React.SetStateAction<ProjectStatus>>;
  project: Project;
}) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { mutate: updateProject } = useUpdateProject();

  function updateStatus(status: ProjectStatus) {
    setStatus(status);
    updateProject({
      projectId: project.id,
      projectData: {
        status,
      },
    });
  }

  return (
    <div className="project-header__status menu-button-container ">
      <button
        type="button"
        ref={btnRef}
        className={`menu-button status-button ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen((state) => !state)}
      >
        {status === "Active" && (
          <div className="flex">
            <svg
              className={`sidebar__color-icon project-status--active status-icon`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Active
          </div>
        )}
        {status === "OnTrack" && (
          <div className="flex">
            <svg
              className={`sidebar__color-icon project-status--onTrack`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            On Track
          </div>
        )}

        {status === "OffTrack" && (
          <div className="flex">
            <svg
              className={`sidebar__color-icon project-status--offTrack`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Off Track
          </div>
        )}
        {status === "OnHold" && (
          <div className="flex">
            <svg
              className={`sidebar__color-icon project-status--onHold`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            On Hold
          </div>
        )}
        {status === "InTesting" && (
          <div className="flex">
            <svg
              className={`sidebar__color-icon project-status--inTesting`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            In Testing
          </div>
        )}
        {status === "Approved" && (
          <div className="flex">
            <svg
              className={`sidebar__color-icon project-status--approved`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Approved
          </div>
        )}

        {/* {status ? status : "Set Status"} */}

        <svg
          className={`icon ${isMenuOpen ? "icon--active" : ""}`}
          viewBox="0 0 6.3499999 6.3500002"
        >
          <g id="layer1" transform="translate(0 -290.65)">
            <path d="m2.2580394 291.96502a.26460982.26460982 0 0 0 -.1741496.46871l1.6190225 1.38699-1.6190225 1.38648a.26460982.26460982 0 1 0 .3436483.40049l1.8536335-1.58595a.26460982.26460982 0 0 0 0-.40256l-1.8536335-1.5875a.26460982.26460982 0 0 0 -.1694987-.0667z" />
          </g>
        </svg>
      </button>

      {isMenuOpen && (
        <div
          className={`menu ${isMenuOpen ? "active" : ""}`}
          ref={menuRef}
          onClick={(e) => {
            setIsMenuOpen(false);
          }}
        >
          <div
            className="item"
            onClick={() => {
              updateStatus("Active");
            }}
          >
            <svg
              className={`sidebar__color-icon project-status--active`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Active
          </div>
          <div
            className="item"
            onClick={() => {
              updateStatus("OnTrack");
            }}
          >
            <svg
              className={`sidebar__color-icon project-status--onTrack`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            On Track
          </div>
          <div
            className="item"
            onClick={() => {
              updateStatus("OffTrack");
            }}
          >
            <svg
              className={`sidebar__color-icon project-status--offTrack`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Off Track
          </div>
          <div
            className="item"
            onClick={() => {
              updateStatus("OffTrack");
            }}
          >
            <svg
              className={`sidebar__color-icon project-status--onHold`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            On Hold
          </div>
          <div
            className="item"
            onClick={() => {
              updateStatus("InTesting");
            }}
          >
            <svg
              className={`sidebar__color-icon project-status--inTesting`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            In Testing
          </div>
          <div
            className="item"
            onClick={() => {
              updateStatus("Approved");
            }}
          >
            <svg
              className={`sidebar__color-icon project-status--approved`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Approved
          </div>
        </div>
      )}
    </div>
  );
};
