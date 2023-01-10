import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
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

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (project: NewProjectData) => createProject(project),

    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push(`/projects/${newProject?.id}`);
    },
  });
};
