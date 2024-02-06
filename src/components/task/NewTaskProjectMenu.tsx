import { Section } from "@prisma/client";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import { useProjectsWithSections } from "@/hooks/ProjectHooks";

const NewTaskProjectMenu = ({
  projectMenuRef,
  setIsProjectMenuOpen,
  isProjectMenuOpen,
  setProject,
}: {
  projectMenuRef: MutableRefObject<null>;
  setIsProjectMenuOpen: Dispatch<SetStateAction<boolean>>;
  isProjectMenuOpen: boolean;
  setProject: Dispatch<
    SetStateAction<{
      id: string;
      name: string;
      sections: Section[];
    } | null>
  >;
}) => {
  const { projects, status } = useProjectsWithSections();

  return (
    <div
      className={`project-menu ${
        isProjectMenuOpen ? "project-menu--active" : ""
      }`}
      ref={projectMenuRef}
    >
      {status === "loading" && (
        <div className="project-menu__skeleton">
          <LoadingSkeleton isDark={false} />
        </div>
      )}
      {status === "success" &&
        projects!.map((project) => (
          <div
            key={project.id}
            className="project-menu__item"
            onClick={() => {
              setIsProjectMenuOpen(!isProjectMenuOpen);
              setProject(project);
            }}
          >
            {project.name}
          </div>
        ))}
    </div>
  );
};

export default NewTaskProjectMenu;
