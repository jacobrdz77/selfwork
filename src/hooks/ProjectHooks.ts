import { Project } from "@prisma/client";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useUserStore } from "../store/user";
import { NewProjectData } from "../types/types";
import {
  createProject,
  getOneProject,
  getProjects,
} from "../utils/projectFunctions";

export const useProjects = () => {
  const workspaceId = useUserStore((state) => state.workspaceId);
  const { data: projects, status } = useQuery(
    ["projects"],
    () => getProjects(workspaceId),
    {
      refetchOnWindowFocus: false,
    }
  );
  return {
    projects,
    status,
  };
};

export const useOneProject = (
  projectId: string,
  showTasks: boolean = false
  // options?: UseQueryOptions<Project, unknown, Project, string[]>
) => {
  const { data: project, status } = useQuery(
    ["project", projectId],
    () => getOneProject(projectId, showTasks),
    {
      refetchOnWindowFocus: false,
      // ...options,
    }
  );
  return {
    project,
    status,
  };
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (project: NewProjectData) => createProject(project),

    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
