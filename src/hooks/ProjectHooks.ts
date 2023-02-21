import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../store/user";
import { NewProjectFormData, ProjectsWithSections } from "../types/types";
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

export const useProjectWithSections = () => {
  const workspaceId = useUserStore((state) => state.workspaceId);
  const { data: projects, status } = useQuery({
    queryKey: ["projects", "sections"],
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
  const { data: project, status } = useQuery(
    ["project", projectId],
    () => getOneProject(projectId),
    {
      enabled: checkProjectId(projectId),
    }
  );
  return {
    project,
    status,
  };
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const ownerId = useUserStore((state) => state.userId);
  const workspaceId = useUserStore((state) => state.workspaceId);

  return useMutation({
    mutationFn: (projectData: NewProjectFormData) =>
      createProject({ ...projectData, ownerId, workspaceId }),

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
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

        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },

    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["workspace"],
      });
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({
        queryKey: ["workspace"],
      });
      console.log("Deleted project: ", data.deletedproject);
    },
  });
};
