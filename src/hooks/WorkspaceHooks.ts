import { WorkspaceWithMembers, WorkspaceWithProjects } from "@/types/types";
import { User, Workspace } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "store/user";

const workspaceId = useUserStore.getState().workspaceId;

export const useOneWorkspace = () => {
  const { data: workspace, status } = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/workspaces/${workspaceId}`);
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as WorkspaceWithMembers;
      } catch (error) {
        throw error;
      }
    },
  });

  return {
    workspace,
    status,
  };
};

export const useWorkspaces = (enabled: boolean = true) => {
  // Future: get owner id from session

  const { data: workspaces, status } = useQuery({
    queryKey: ["workspaces", user?.id],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/workspaces?ownerId=${user?.id}`);
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as Workspace[];
      } catch (error) {
        throw error;
      }
    },
    enabled,
  });

  return {
    workspaces,
    status,
  };
};

export const useWorkspaceWithProjects = () => {
  const { data: workspace, status } = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      try {
        const response = await fetch(
          `/api/workspaces/${workspaceId}?with_projects=true`
        );
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as WorkspaceWithProjects;
      } catch (error) {
        throw error;
      }
    },
  });

  return {
    workspace,
    projects: workspace?.projects,
    status,
  };
};

export const useWorkspaceMembers = () => {
  const { data: members, status } = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/workspaces/${workspaceId}/members`);
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as User[];
      } catch (error) {
        throw error;
      }
    },
  });

  return {
    members,
    status,
  };
};

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (workspaceData: {
      name?: string;
      description?: string;
    }) => {
      try {
        const response = await fetch(`/api/workspaces/${workspaceId}`, {
          method: "PUT",
          body: JSON.stringify({
            workspaceData: {
              name: workspaceData.name,
              description: workspaceData.description,
            },
          }),
        });
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as Workspace;
      } catch (error) {
        console.log(error);
      }
    },

    onSuccess: (updatedWorkspace) => {
      queryClient.invalidateQueries({ queryKey: ["workspace", workspaceId] });
      console.log("Updated workspace! \n", updatedWorkspace);
    },
  });
};
