import {
  getOneWorkspace,
  getWorkspaceInvitees,
  getWorkspaceMembers,
  getWorkspaces,
  updateworkspace,
} from "@/utils/workspaceFunctions";
import { User, Workspace } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore, userStore } from "store/user";

const workspaceId = useUserStore.getState().workspaceId;

export const useOneWorkspace = () => {
  const workspaceId = userStore.getState().workspaceId;
  const { data: workspace, status } = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: () => getOneWorkspace(workspaceId),
  });

  return {
    workspace,
    status,
  };
};

export const useWorkspaces = (enabled: boolean = true) => {
  // Future: get owner id from session
  const userId = userStore.getState().userId;
  const { data: workspaces, status } = useQuery({
    queryKey: ["workspaces", userId],
    queryFn: () => getWorkspaces(userId),
    enabled,
  });

  return {
    workspaces,
    status,
  };
};

export const useWorkspaceMembers = () => {
  const { data: members, status } = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: () => getWorkspaceMembers(workspaceId),
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
    }) => updateworkspace(workspaceId, workspaceData),

    onSuccess: (updatedWorkspace) => {
      queryClient.invalidateQueries({ queryKey: ["workspace", workspaceId] });
      console.log("Updated workspace!", updatedWorkspace);
    },
  });
};

export const useWorkspaceInvitees = (workspaceId: string) => {
  const { data: invitees, status } = useQuery({
    queryKey: ["inviteees"],
    queryFn: () => getWorkspaceInvitees(workspaceId),
    enabled: workspaceId ? true : false,
  });

  return {
    invitees,
    status,
  };
};
