import { WorkspaceWithMembers, WorkspaceWithProjects } from "@/types/types";
import { User, Workspace } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "store/user";

const workspaceId = useUserStore.getState().workspaceId;

export const useWorkspace = () => {
  const { data: workspace, status } = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/workspaces/${workspaceId}`);
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

export const useWorkspaceWithProjects = () => {
  const { data: workspace, status } = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      try {
        const response = await fetch(
          `/api/workspaces/${workspaceId}?with_projects=true`
        );
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
