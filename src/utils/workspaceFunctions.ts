import { InviteesEmails, WorkspaceWithMembers } from "@/types/types";
import { User, Workspace } from "@prisma/client";
import { axios } from "libs/axios";

export const getOneWorkspace = async (workspaceId: string) => {
  try {
    const response = await axios.get(`/workspaces/${workspaceId}`);
    return response.data as WorkspaceWithMembers;
  } catch (error) {
    console.log(error);
  }
};

export const getWorkspaces = async (userId: string) => {
  try {
    const response = await axios.get(`/workspaces?ownerId=${userId}`);

    return response.data as Workspace[];
  } catch (error) {
    console.log(error);
  }
};

export const updateworkspace = async (
  workspaceId: string,
  workspaceData: {
    name?: string;
    description?: string;
  }
) => {
  try {
    const response = await axios.put(
      `/workspaces/${workspaceId}`,
      workspaceData
    );
    return response.data as Workspace;
  } catch (error) {
    console.log(error);
  }
};

// export const createworkspace = async (workspace: NewWorkspace) => {
//   try {
//     const response = await axios.post("/workspaces", { workspace });

//     return response.data as workspace;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getWorkspaceMembers = async (workspaceId: string) => {
  try {
    const response = await axios.get(`/workspaces/${workspaceId}/members`);
    return response.data as User[];
  } catch (error) {
    console.log(error);
  }
};
// export const deleteWorkspace = async (workspaceId: string) => {
//   const response = await axios.delete(`/workspaces/${workspaceId}`);
//   return response.data as workspace;
// };

export const getWorkspaceInvitees = async (workspaceId: string) => {
  try {
    const response = await axios.get(`/workspaces/${workspaceId}/invite_link`);

    return response.data as InviteesEmails;
  } catch (error) {
    console.log(error);
  }
};
