import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

type HeaderProps = {
  title: string | JSX.Element;
  children?: JSX.Element | JSX.Element[];
};

const ProjectHeader: React.FC<HeaderProps> = ({ title, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname.split("/")[3];
  const { projectId } = router.query;
  return (
    <header className="project-header">
      <div className="project-header__top">
        <h1 className="project-header__title">{title}</h1>
        <button
          className="project-header__button"
          onClick={() => setIsMenuOpen((state) => !state)}
        >
          <svg
            className={`project-header__button-icon ${
              isMenuOpen ? "project-header__button-icon--active" : ""
            }`}
            viewBox="0 0 6.3499999 6.3500002"
          >
            <g id="layer1" transform="translate(0 -290.65)">
              <path
                id="path9429"
                d="m2.2580394 291.96502a.26460982.26460982 0 0 0 -.1741496.46871l1.6190225 1.38699-1.6190225 1.38648a.26460982.26460982 0 1 0 .3436483.40049l1.8536335-1.58595a.26460982.26460982 0 0 0 0-.40256l-1.8536335-1.5875a.26460982.26460982 0 0 0 -.1694987-.0667z"
                font-variant-ligatures="normal"
                font-variant-position="normal"
                font-variant-caps="normal"
                font-variant-numeric="normal"
                font-variant-alternates="normal"
                font-feature-settings="normal"
                text-indent="0"
                text-align="start"
                text-decoration-line="none"
                text-decoration-style="solid"
                text-decoration-color="rgb(0,0,0)"
                text-transform="none"
                text-orientation="mixed"
                white-space="normal"
                shape-padding="0"
                mix-blend-mode="normal"
                solid-color="rgb(0,0,0)"
                solid-opacity="1"
              />
            </g>
          </svg>
          <div
            className={`project-header__menu-container ${
              isMenuOpen ? "project-header__menu-container--active" : ""
            }`}
          >
            <ul className="project-header__menu">
              <li>Edit project details</li>
              <li>Delete project</li>
            </ul>
          </div>
        </button>
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
                currentPath === "list" ? "project-header__nav-link--active" : ""
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
  );
};

export default ProjectHeader;
