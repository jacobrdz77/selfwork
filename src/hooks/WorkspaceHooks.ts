import { WorkspaceWithMembers } from "@/types/types";
import { Workspace } from "@prisma/client";
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
