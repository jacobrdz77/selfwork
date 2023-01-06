import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../store/user";
import { getOneProject, getProjects } from "../utils/projectFunctions";

export const useProjects = () => {
  const userId = useUserStore((state) => state.userId);
  const { data: projects, status } = useQuery(
    ["projects", userId],
    () => getProjects(userId!),
    {
      refetchOnWindowFocus: false,
    }
  );

  console.log("projects: ", projects);

  return {
    projects,
    status,
  };
};

export const useOneProject = (projectId: string) => {
  const { data: project, status } = useQuery(
    ["project", projectId],
    () => getOneProject(projectId),
    {
      refetchOnWindowFocus: false,
    }
  );

  return {
    project,
    status,
  };
};
