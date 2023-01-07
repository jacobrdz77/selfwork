import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../store/user";
import { NewProjectData } from "../types/types";
import {
  createProject,
  getOneProject,
  getProjects,
} from "../utils/projectFunctions";

export const useProjects = () => {
  const userId = useUserStore((state) => state.userId);
  const { data: projects, status } = useQuery(
    ["projects"],
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

  console.log("project: ", project);

  return {
    project,
    status,
  };
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: NewProjectData) => createProject(project),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
