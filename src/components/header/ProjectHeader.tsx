import { useMenu } from "@/hooks/useMenu";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useRef } from "react";

type HeaderProps = {
  title: string | JSX.Element;
  children?: JSX.Element | JSX.Element[];
};

const ProjectHeader: React.FC<HeaderProps> = ({ title, children }) => {
  const router = useRouter();
  const currentPath = router.pathname.split("/")[3];
  const { projectId } = router.query;
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  return (
    <header className="project-header">
      <div className="project-header__top">
        <h1 className="project-header__title">{title}</h1>
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
            className={`project-header__menu ${
              isMenuOpen ? "project-header__menu--active" : ""
            }`}
            ref={menuRef}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <div
              className="project-card__edit-menu-item"
              onClick={() => console.log("EDIT")}
            >
              <svg
                className="project-card__edit-menu--icon"
                viewBox="0 0 24 24"
              >
                <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z" />
              </svg>
              Edit project details
            </div>
            <div
              className="project-card__edit-menu-item project-card__edit-menu-item--delete"
              onClick={() => console.log("Delete")}
            >
              <svg
                className="project-card__edit-menu--icon"
                viewBox="0 0 24 24"
              >
                <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
              </svg>
              Delete project
            </div>
          </div>
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
