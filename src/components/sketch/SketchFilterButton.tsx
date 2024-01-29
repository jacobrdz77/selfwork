import useMenu from "@/hooks/useMenu";
import React from "react";

const SketchFilterButton = ({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: any;
}) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();

  return (
    <button
      aria-label="filter button"
      className={`menu-container ${isMenuOpen ? "active" : ""}`}
    >
      <div
        ref={btnRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsMenuOpen(!isMenuOpen);
        }}
        className="button button--outline sorting-button"
        role="button"
      >
        <span>
          {filter === "lastViewed" && "Last Viewed"}{" "}
          {filter === "dateCreated" && "Date created"}{" "}
          {filter === "alphabetical" && "Alphabetical"}
        </span>
        <div>
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.40365 1.68202C9.4067 1.54304 9.36641 1.40655 9.28831 1.29154C9.21022 1.17653 9.09817 1.08871 8.96785 1.04029C8.83754 0.99187 8.69539 0.985257 8.56114 1.02137C8.42689 1.05748 8.30729 1.13453 8.21885 1.24179L4.71267 5.33451L1.20773 1.24179C1.1532 1.16759 1.08396 1.10545 1.0043 1.05926C0.924639 1.01307 0.836272 0.983827 0.744784 0.97336C0.653296 0.962893 0.560652 0.971429 0.472616 0.998433C0.38458 1.02544 0.303041 1.07033 0.233157 1.13029C0.163273 1.19026 0.106586 1.26401 0.0665236 1.34692C0.0264616 1.42983 0.00395966 1.52013 0.00041008 1.61214C-0.00314045 1.70416 0.0122938 1.79592 0.0458479 1.88167C0.0794029 1.96742 0.1303 2.04533 0.195355 2.1105L4.20452 6.79629C4.26731 6.86988 4.34526 6.92896 4.4331 6.96948C4.52094 7.01 4.61655 7.03098 4.71329 7.03098C4.81003 7.03098 4.90564 7.01 4.99348 6.96948C5.08133 6.92896 5.15935 6.86988 5.22214 6.79629L9.23516 2.1105C9.3403 1.99213 9.39992 1.8403 9.40365 1.68202Z"
              fill="black"
            />
          </svg>
        </div>
        <div
          className={`menu ${isMenuOpen ? "menu--active" : ""}`}
          ref={menuRef}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div
            className={`item ${filter === "alphabetical" ? "active" : ""}`}
            onClick={() => {
              setFilter("alphabetical");
              setIsMenuOpen(false);
            }}
          >
            Alphabetical
          </div>
          <div
            className={`item ${filter === "lastViewed" ? "active" : ""}`}
            onClick={() => {
              setFilter("lastViewed");
              setIsMenuOpen(false);
            }}
          >
            Last viewed
          </div>
          <div
            className={`item ${filter === "dateCreated" ? "active" : ""}`}
            onClick={() => {
              setFilter("dateCreated");
              setIsMenuOpen(false);
            }}
          >
            Date created
          </div>
        </div>
      </div>
    </button>
  );
};

export default SketchFilterButton;
