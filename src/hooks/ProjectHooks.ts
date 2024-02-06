import { userStore } from "../store/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NewProjectFormData, UpdateProjectData } from "../types/types";
import {
  createProject,
  deleteProject,
  getOneProject,
  getProjects,
  getProjectsWithSections,
  updateProject,
} from "../utils/projectFunctions";

export const useProjects = () => {
  const workspaceId = userStore.getState().workspaceId;
  const { data: projects, status } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(workspaceId),
  });

  return {
    projects,
    status,
  };
};

export const useProjectsWithSections = () => {
  const workspaceId = userStore.getState().workspaceId;
  const { data: projects, status } = useQuery({
    queryKey: ["projects", "sections"],
    queryFn: async () => getProjectsWithSections(workspaceId),
    // select(data) {
    //   if (!data) return;
    //   const projects = data.map((project) => ({
    //     id: project.id,
    //     name: project.name,
    //     sections: project.sections,
    //   }));
    //   return projects;
    // },
  });

  return {
    projects,
    status,
  };
};

const checkProjectId = (id: string) => {
  if (id) return true;
  else return false;
};

export const useOneProject = (projectId: string) => {
  const { data: project, status } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getOneProject(projectId),
    enabled: checkProjectId(projectId),
  });

  return {
    project,
    status,
  };
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const ownerId = userStore.getState().userId;
  const workspaceId = userStore.getState().workspaceId;

  return useMutation({
    mutationFn: (projectData: NewProjectFormData) =>
      createProject({ ...projectData, ownerId, workspaceId }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["workspace"],
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => deleteProject(projectId),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      await queryClient.invalidateQueries({
        queryKey: ["workspace"],
      });
      console.log("Deleted project", data);
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      projectData,
    }: {
      projectId: string;
      projectData: UpdateProjectData;
    }) => updateProject(projectId, projectData),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      await queryClient.invalidateQueries({ queryKey: ["project", data?.id] });
      await queryClient.invalidateQueries({ queryKey: ["workspace"] });
    },
  });
};
