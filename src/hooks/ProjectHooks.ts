import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../store/user";
import { NewProjectData } from "../types/types";
import {
  createProject,
  getOneProject,
  getProjects,
} from "../utils/projectFunctions";

export const useProjects = () => {
  const workspaceId = useUserStore((state) => state.workspaceId);
  const { data: projects, status } = useQuery(["projects"], () =>
    getProjects(workspaceId)
  );
  return {
    projects,
    status,
  };
};

export const useOneProject = (
  projectId: string
  // options?: UseQueryOptions<Project, unknown, Project, string[]>
) => {
  const { data: project, status } = useQuery(["project", projectId], () =>
    getOneProject(projectId)
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
