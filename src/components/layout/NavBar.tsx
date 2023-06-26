import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useModalStore } from "../../store/user";
import SidebarProject from "../project/SidebarProject";
import UserSidebarCard from "../user/UserSidebarCard";
import useMenu from "@/hooks/useMenu";
import { useWorkspaceWithProjects } from "@/hooks/WorkspaceHooks";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import { useUserInfo } from "@/hooks/MemberHooks";

const NavBar = () => {
  const [isNavMinimized, setIsNavMinimized] = useState(false);
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const router = useRouter();
  const setIsAddTaskOpen = useModalStore((state) => state.setIsAddTaskOpen);
  const setIsAddProjectModalOpen = useModalStore(
    (state) => state.setIsAddProjectModalOpen
  );
  const issClientModalOpen = useModalStore((state) => state.isClientModalOpen);
  const setIsClientModalOpen = useModalStore(
    (state) => state.setIsClientModalOpen
  );

  const { workspace, projects, status } = useWorkspaceWithProjects();

  return (
    <>
      <div className={`sidebar ${isNavMinimized ? "sidebar--minimized" : ""}`}>
        {/* LOGO */}
        <div className="sidebar__logo">
          {isNavMinimized ? "s" : "selfwork"}
          <span className="sidebar__logo--dot">.</span>
        </div>
        <div className="sidebar__add-container">
          <button
            ref={btnRef}
            className={`sidebar__add ${
              isNavMinimized ? "sidebar__add--minimized" : ""
            }`}
            onClick={() => setIsMenuOpen((state) => !state)}
          >
            <svg
              fill="currentColor"
              className="sidebar__add-icon"
              viewBox="0 0 24 24"
            >
              <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z" />
            </svg>
            <span>Add</span>
          </button>
          <div
            className={`sidebar__add-menu ${
              isMenuOpen ? "project-card__edit-menu--active" : ""
            }`}
            ref={menuRef}
            onClick={(e) => {
              setIsMenuOpen(false);
              setIsAddTaskOpen(true);
            }}
          >
            <div
              className="sidebar__add-menu-item"
              onClick={() => console.log("Add task modal opens")}
            >
              <svg className="sidebar__add-menu-icon" viewBox="0 0 24 24">
                <path d="m16.19 2h-8.38c-3.64 0-5.81 2.17-5.81 5.81v8.38c0 3.64 2.17 5.81 5.81 5.81h8.38c3.64 0 5.81-2.17 5.81-5.81v-8.38c0-3.64-2.17-5.81-5.81-5.81zm-6.22 12.9-2.25 2.25c-.15.15-.34.22-.53.22s-.39-.07-.53-.22l-.75-.75c-.3-.29-.3-.77 0-1.06.29-.29.76-.29 1.06 0l.22.22 1.72-1.72c.29-.29.76-.29 1.06 0 .29.29.29.77 0 1.06zm0-7-2.25 2.25c-.15.15-.34.22-.53.22s-.39-.07-.53-.22l-.75-.75c-.3-.29-.3-.77 0-1.06.29-.29.76-.29 1.06 0l.22.22 1.72-1.72c.29-.29.76-.29 1.06 0 .29.29.29.77 0 1.06zm7.59 8.72h-5.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5.25c.42 0 .75.34.75.75s-.33.75-.75.75zm0-7h-5.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5.25c.42 0 .75.34.75.75s-.33.75-.75.75z" />
              </svg>
              Task
            </div>
            <div
              className="sidebar__add-menu-item"
              onClick={(e) => {
                setIsMenuOpen(false);
                setIsAddProjectModalOpen(true);
                e.stopPropagation();
              }}
            >
              <svg
                className="sidebar__add-menu-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Icon">
                  <path d="m20 21.25c1.518 0 2.75-1.232 2.75-2.75v-8.5c0-1.518-1.232-2.75-2.75-2.75 0 0-3.9 0-5.412 0-.09 0-.174-.049-.218-.129-.481-.866-1.448-2.605-1.929-3.471-.308-.555-.894-.9-1.529-.9h-6.912c-1.518 0-2.75 1.232-2.75 2.75v13c0 1.518 1.232 2.75 2.75 2.75z" />
                  <path d="m13.919 4.25 1.111 2h4.97c1.086 0 2.065.463 2.75 1.201v-.451c0-1.518-1.232-2.75-2.75-2.75z" />
                </g>
              </svg>
              Project
            </div>
            <div
              className="sidebar__add-menu-item"
              onClick={(e) => {
                setIsMenuOpen(false);
                setIsClientModalOpen(true);
                e.stopPropagation();
              }}
            >
              <svg className="sidebar__add-menu-icon" viewBox="0 0 512 512">
                <g>
                  <circle cx="256" cy="119.631" r="87" />
                  <circle cx="432" cy="151.63" r="55" />
                  <circle cx="80" cy="151.63" r="55" />
                  <path d="m134.19 256.021c-21.65-17.738-41.257-15.39-66.29-15.39-37.44 0-67.9 30.28-67.9 67.49v109.21c0 16.16 13.19 29.3 29.41 29.3 70.026 0 61.59 1.267 61.59-3.02 0-77.386-9.166-134.137 43.19-187.59z" />
                  <path d="m279.81 241.03c-43.724-3.647-81.729.042-114.51 27.1-54.857 43.94-44.3 103.103-44.3 175.48 0 19.149 15.58 35.02 35.02 35.02 211.082 0 219.483 6.809 232-20.91 4.105-9.374 2.98-6.395 2.98-96.07 0-71.226-61.673-120.62-111.19-120.62z" />
                  <path d="m444.1 240.63c-25.17 0-44.669-2.324-66.29 15.39 51.965 53.056 43.19 105.935 43.19 187.59 0 4.314-7.003 3.02 60.54 3.02 16.8 0 30.46-13.61 30.46-30.34v-108.17c0-37.21-30.46-67.49-67.9-67.49z" />
                </g>
              </svg>
              Client
            </div>
          </div>
        </div>
        {/* Links*/}
        <nav className="sidebar__nav-container">
          <ul className="sidebar__nav">
            <li
              className={`sidebar__link-container ${
                isNavMinimized ? "sidebar__link-container--minimized" : ""
              }`}
            >
              <Link
                className={`sidebar__link ${
                  isNavMinimized ? "sidebar__link--minimized" : ""
                } ${
                  router.pathname === "/my-tasks/list"
                    ? "sidebar__link--active"
                    : ""
                }`}
                href="/my-tasks/list"
              >
                <svg
                  className="sidebar__link-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m16.19 2h-8.38c-3.64 0-5.81 2.17-5.81 5.81v8.38c0 3.64 2.17 5.81 5.81 5.81h8.38c3.64 0 5.81-2.17 5.81-5.81v-8.38c0-3.64-2.17-5.81-5.81-5.81zm-6.22 12.9-2.25 2.25c-.15.15-.34.22-.53.22s-.39-.07-.53-.22l-.75-.75c-.3-.29-.3-.77 0-1.06.29-.29.76-.29 1.06 0l.22.22 1.72-1.72c.29-.29.76-.29 1.06 0 .29.29.29.77 0 1.06zm0-7-2.25 2.25c-.15.15-.34.22-.53.22s-.39-.07-.53-.22l-.75-.75c-.3-.29-.3-.77 0-1.06.29-.29.76-.29 1.06 0l.22.22 1.72-1.72c.29-.29.76-.29 1.06 0 .29.29.29.77 0 1.06zm7.59 8.72h-5.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5.25c.42 0 .75.34.75.75s-.33.75-.75.75zm0-7h-5.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h5.25c.42 0 .75.34.75.75s-.33.75-.75.75z" />
                </svg>
                <span>My Tasks</span>
              </Link>
              <div className="sidebar__tooltip">
                <span>My Tasks</span>
              </div>
            </li>
            <li
              className={`sidebar__link-container ${
                isNavMinimized ? "sidebar__link-container--minimized" : ""
              }`}
            >
              <Link
                className={`sidebar__link ${
                  isNavMinimized ? "sidebar__link--minimized" : ""
                } ${
                  router.pathname === "/clients" ? "sidebar__link--active" : ""
                }`}
                href="/clients"
              >
                <svg
                  className="sidebar__link-icon"
                  id="Capa_1"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <circle cx="256" cy="119.631" r="87" />
                    <circle cx="432" cy="151.63" r="55" />
                    <circle cx="80" cy="151.63" r="55" />
                    <path d="m134.19 256.021c-21.65-17.738-41.257-15.39-66.29-15.39-37.44 0-67.9 30.28-67.9 67.49v109.21c0 16.16 13.19 29.3 29.41 29.3 70.026 0 61.59 1.267 61.59-3.02 0-77.386-9.166-134.137 43.19-187.59z" />
                    <path d="m279.81 241.03c-43.724-3.647-81.729.042-114.51 27.1-54.857 43.94-44.3 103.103-44.3 175.48 0 19.149 15.58 35.02 35.02 35.02 211.082 0 219.483 6.809 232-20.91 4.105-9.374 2.98-6.395 2.98-96.07 0-71.226-61.673-120.62-111.19-120.62z" />
                    <path d="m444.1 240.63c-25.17 0-44.669-2.324-66.29 15.39 51.965 53.056 43.19 105.935 43.19 187.59 0 4.314-7.003 3.02 60.54 3.02 16.8 0 30.46-13.61 30.46-30.34v-108.17c0-37.21-30.46-67.49-67.9-67.49z" />
                  </g>
                </svg>
                <span>Clients</span>
              </Link>
              <div className="sidebar__tooltip">
                <span>Clients</span>
              </div>
            </li>
          </ul>
        </nav>

        {/* PROJECTS */}
        <nav className="sidebar__nav-container sidebar__nav--workspace">
          {status === "loading" && (
            <div className="sidebar__workspace-loading">
              <LoadingSkeleton isDark={true} />
            </div>
          )}
          {status === "success" &&
            (isNavMinimized ? (
              <div
                onClick={() => setIsAddProjectModalOpen(true)}
                className="sidebar__workspace-add--minimized"
              >
                <svg
                  className="sidebar__workspace-add-icon"
                  viewBox="0 0 24 24"
                >
                  <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z" />
                </svg>
                <div className="sidebar__tooltip">
                  <span>Create project</span>
                </div>
              </div>
            ) : (
              <div
                className={`sidebar__link-container ${
                  isNavMinimized ? "sidebar__link-container--minimized" : ""
                }`}
              >
                <Link
                  className={`sidebar__projects ${
                    isNavMinimized ? "sidebar__projects--minimized" : ""
                  } ${
                    router.pathname === "/projects"
                      ? "sidebar__link--active"
                      : ""
                  }`}
                  href="/projects"
                >
                  <span>Projects</span>
                  <div
                    onClick={(e) => {
                      setIsAddProjectModalOpen(true);
                      e.preventDefault();
                    }}
                    className="sidebar__projects-add"
                  >
                    <svg
                      className="sidebar__projects-add-icon"
                      viewBox="0 0 24 24"
                    >
                      <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z" />
                    </svg>
                  </div>
                </Link>
                <div className="sidebar__tooltip">
                  <span>Projects</span>
                </div>
              </div>
            ))}

          <div
            className={`sidebar__projects-list ${
              isNavMinimized ? "sidebar__projects-list--minimized" : ""
            } `}
          >
            {status === "loading" && (
              <div className="sidebar__projects-loading">
                <LoadingSkeleton isDark={true} />
                <LoadingSkeleton isDark={true} />
                <LoadingSkeleton isDark={true} />
              </div>
            )}
            {status === "success" &&
              projects?.map((project) => (
                <SidebarProject
                  id={project.id}
                  key={project.id}
                  name={project.name}
                  color={project.iconColor}
                />
              ))}
            {/* {status === "success" && projects!.length > 5 && (
              <span
                className={`sidebar__show-more-projects ${
                  isNavMinimized ? "sidebar__show-more-projects--minimized" : ""
                }`}
                role="button"
              >
                Show more projects
              </span>
            )} */}
            {status === "success" && projects!.length === 0 && (
              <span
                className={`sidebar__no-projects ${
                  isNavMinimized ? "sidebar__no-projects--minimized" : ""
                }`}
                role="button"
              >
                No Projects
              </span>
            )}
          </div>
        </nav>

        {/* Workspace */}
        <div
          className={`sidebar__nav-container sidebar__workspace-container  ${
            isNavMinimized ? "sibebar__workspace--minimized" : ""
          }`}
        >
          <div className="sidebar__workspace-title">Team</div>
          <Link href={"/workspace"} className="sidebar__workspace">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="sidebar__workspace-icon"
              >
                <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
              </svg>
            </div>
            <span className="sidebar__workspace-name">
              {workspace && workspace.name}
            </span>
          </Link>
          <div className="sidebar__tooltip">
            <span>{workspace && workspace.name}</span>
          </div>
        </div>

        <footer className="nav__footer">
          <button
            onClick={() => setIsNavMinimized(!isNavMinimized)}
            className={`sidebar__toggle ${
              isNavMinimized ? "sidebar__toggle--active" : ""
            }`}
          >
            <svg className="sidebar__toggle-icon" viewBox="0 0 30 30">
              <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z" />
            </svg>
          </button>
          {/* User Profile */}
          {status === "loading" && (
            <div className="sidebar__user-loading">
              <LoadingSkeleton isDark={true} />
            </div>
          )}
          <UserSidebarCard />
        </footer>
      </div>
    </>
  );
};

export default NavBar;
