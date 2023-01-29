import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useUserStore } from "../../store/user";
import { useProjects } from "@/hooks/ProjectHooks";
import SidebarProject from "../project/SidebarProject";

const NavBar = () => {
  const [isNavMinimized, setIsNavMinimized] = useState(false);
  const { projects, status } = useProjects();

  const router = useRouter();
  return (
    <div className={`sidebar ${isNavMinimized ? "sidebar--minimized" : ""}`}>
      {/* LOGO */}
      <div className="sidebar__logo">
        {isNavMinimized ? "s" : "selfwork"}
        <span className="sidebar__logo--dot">.</span>
      </div>
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

      <div className="sidebar__add-container">
        <button
          className={`sidebar__add ${
            isNavMinimized ? "sidebar__add--minimized" : ""
          }`}
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
      </div>
      {/* Links*/}
      <nav className="sidebar__nav-container">
        <ul className="sidebar__nav">
          <li className="sidebar__link-container">
            <Link
              className={`sidebar__link ${
                isNavMinimized ? "sidebar__link--minimized" : ""
              } ${router.pathname === "/tasks" ? "sidebar__link--active" : ""}`}
              href="/tasks"
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
          </li>
          <li className="sidebar__link-container">
            <Link
              className={`sidebar__link ${
                isNavMinimized ? "sidebar__link--minimized" : ""
              } ${
                router.pathname === "/projects" ? "sidebar__link--active" : ""
              }`}
              href="/projects"
            >
              <svg
                className="sidebar__link-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Icon">
                  <path d="m20 21.25c1.518 0 2.75-1.232 2.75-2.75v-8.5c0-1.518-1.232-2.75-2.75-2.75 0 0-3.9 0-5.412 0-.09 0-.174-.049-.218-.129-.481-.866-1.448-2.605-1.929-3.471-.308-.555-.894-.9-1.529-.9h-6.912c-1.518 0-2.75 1.232-2.75 2.75v13c0 1.518 1.232 2.75 2.75 2.75z" />
                  <path d="m13.919 4.25 1.111 2h4.97c1.086 0 2.065.463 2.75 1.201v-.451c0-1.518-1.232-2.75-2.75-2.75z" />
                </g>
              </svg>

              <span>Projects</span>
            </Link>
          </li>
          <li className="sidebar__link-container">
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
          </li>
        </ul>
      </nav>
      <nav className="sidebar__nav-container sidebar__nav--workspace">
        {isNavMinimized ? (
          <div className="sidebar__workspace-add--minimized">
            <svg className="sidebar__workspace-add-icon" viewBox="0 0 24 24">
              <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z" />
            </svg>
            <span className="sidebar__tooltip">Create project</span>
          </div>
        ) : (
          <Link
            href="/workspace"
            className={`sidebar__workspace ${
              isNavMinimized ? "sidebar__workspace--minimized" : ""
            }`}
          >
            <span className="sidebar__workspace-name">My Workspace</span>
            <div className="sidebar__workspace-add">
              <svg className="sidebar__workspace-add-icon" viewBox="0 0 24 24">
                <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z" />
              </svg>
            </div>
          </Link>
        )}

        <div
          className={`sidebar__projects-list ${
            isNavMinimized ? "sidebar__projects-list--minimized" : ""
          } `}
        >
          {status === "loading" && <p>Loading..</p>}
          {status === "success" &&
            projects?.map((project) => (
              <SidebarProject
                key={project.id}
                name={project.name}
                color={project.iconColor}
              />
            ))}
          {status === "success" && projects!.length > 5 && (
            <span
              className={`sidebar__show-more-projects ${
                isNavMinimized ? "sidebar__show-more-projects--minimized" : ""
              }`}
              role="button"
            >
              Show more projects
            </span>
          )}
        </div>
      </nav>

      <footer className="nav__footer">
        {/* User Profile
        <div className="w-full flex justify-center">
          <div className="w-[190px] mt-9">
            <Avatar name={name} />
          </div>
        </div> */}

        {/* Sign out button */}
        {/* <a className="nav__signout" onClick={() => signOut()}>
          <svg
            className="icon"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="m252.326 430.455v25.516c0 20.462-10.198 38.127-27.919 48.357-8.526 4.922-18.042 7.668-27.908 7.673-9.875.005-19.388-2.746-27.92-7.673l-113.456-65.504c-17.723-10.232-27.919-27.892-27.919-48.357v-334.629c0-30.791 25.048-55.838 55.838-55.838h249.871c30.792 0 55.842 25.045 55.842 55.838v70.539c0 10.119-8.216 18.335-18.335 18.335-10.122 0-18.331-8.215-18.331-18.335v-70.539c0-10.573-8.603-19.176-19.176-19.176h-218.952l110.446 63.777c17.715 10.23 27.919 27.89 27.919 48.347v245.003h80.587c10.572 0 19.176-8.598 19.176-19.172v-61.836c0-10.126 8.204-18.335 18.331-18.335 10.123 0 18.335 8.211 18.335 18.335v61.836c0 30.793-25.05 55.838-55.842 55.838zm169.883-196.897-20.191 20.191c-7.159 7.159-7.157 18.765 0 25.925 3.446 3.448 8.09 5.364 12.963 5.364 4.878 0 9.517-1.911 12.968-5.364l51.479-51.488c7.157-7.158 7.158-18.758 0-25.916l-51.479-51.48c-7.16-7.16-18.767-7.157-25.93-.001-7.157 7.152-7.155 18.763 0 25.917l20.19 20.186h-135.26c-10.129 0-18.331 8.208-18.331 18.336s8.203 18.331 18.331 18.331h135.26z"
              fill-rule="evenodd"
            />
          </svg>
          Signout
          <div className="icon-container"></div>
        </a> */}
      </footer>
    </div>
  );
};

export default NavBar;
