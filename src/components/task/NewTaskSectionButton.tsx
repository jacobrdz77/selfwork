import useMenu from "@/hooks/useMenu";
import { Section } from "@prisma/client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import LoadingSkeleton from "../UI/LoadingSkeleton";

const NewTaskSectionButton = ({
  selectedSection,
  setSelectedSection,
  sections,
}: {
  selectedSection: Section | null;
  setSelectedSection: Dispatch<SetStateAction<Section | null>>;
  sections: Section[];
}) => {
  const { btnRef, menuRef, isMenuOpen, setIsMenuOpen } = useMenu();
  useEffect(() => {
    setSelectedSection(sections[0]);

    return () => {
      setSelectedSection(null);
    };
  }, [sections, setSelectedSection]);

  return (
    <div className="new-task__section-select-container">
      <div
        className="new-task__section-select"
        ref={btnRef}
        onClick={(e) => {
          setIsMenuOpen(!isMenuOpen);
          e.stopPropagation();
        }}
      >
        <span>{!selectedSection ? "" : selectedSection.name}</span>

        <svg className="section-select__icon" viewBox="0 0 6.3499999 6.3500002">
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
            ></path>
          </g>
        </svg>
      </div>
      {isMenuOpen && (
        <div
          className={`section-menu ${isMenuOpen ? "section-menu--active" : ""}`}
          ref={menuRef}
        >
          {sections!.map((section) => (
            <div
              key={section.id}
              className="section-menu__item"
              onClick={(e) => {
                setIsMenuOpen(!isMenuOpen);
                setSelectedSection(section);
                e.stopPropagation();
              }}
            >
              {section.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewTaskSectionButton;
