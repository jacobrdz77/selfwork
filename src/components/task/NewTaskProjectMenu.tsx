import { Section } from "@prisma/client";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { useUserStore } from "store/user";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import { useQuery } from "@tanstack/react-query";
import { ProjectsWithSections } from "@/types/types";

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
  const workspaceId = useUserStore((state) => state.workspaceId);
  const { data: projects, status } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `/api/workspaces/${workspaceId}/projects?sections=true`
        );
        return (await response.json()) as ProjectsWithSections;
      } catch (error) {
        throw error;
      }
    },
    select(data) {
      if (!data) return;
      const projects = data.map((project) => ({
        id: project.id,
        name: project.name,
        sections: project.sections,
      }));
      return projects;
    },
  });

  return (
    <div
      className={`project-menu ${
        isProjectMenuOpen ? "project-menu--active" : ""
      }`}
      ref={projectMenuRef}
    >
      {status === "loading" && (
        <div className="project-menu__skeleton">
          <LoadingSkeleton isDark={true} />
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
