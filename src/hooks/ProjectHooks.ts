import { useUserStore, userStore } from "../store/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  NewProjectFormData,
  ProjectsWithSections,
  UpdateProjectData,
} from "../types/types";
import {
  createProject,
  getOneProject,
  getProjects,
  updateProject,
} from "../utils/projectFunctions";
import { Project } from "@prisma/client";

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

export const useProjectWithSections = () => {
  const workspaceId = userStore.getState().workspaceId;
  const { data: projects, status } = useQuery({
    queryKey: ["projects", "sections"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `/api/workspaces/${workspaceId}/projects?sections=true`
        );
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as ProjectsWithSections;
      } catch (error) {
        throw error;
      }
    },
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
    mutationFn: async (projectId: string) => {
      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return await response.json();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      await queryClient.invalidateQueries({
        queryKey: ["workspace"],
      });
      console.log("Deleted project: ", data);
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
    }) => {
      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          method: "PUT",

          // body: JSON.stringify({
          //   projectData: projectData,
          // }),
          body: JSON.stringify({
            projectData: projectData,
          }),
        });

        if (!response.ok) {
          throw Error("Error happend!: " + response.status.toLocaleString());
        }
        return (await response.json()) as Project;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["project", data.id] });
      await queryClient.invalidateQueries({ queryKey: ["workspace"] });
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
