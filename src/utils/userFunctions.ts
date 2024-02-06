import { UpdateUserData, UserWithAll } from "@/types/types";
import { User } from "@prisma/client";
import { axios } from "libs/axios";

export const getUsers = async (userId: string) => {
  const response = await axios.get(`/users/${userId}`);

  return response.data as User[];
};

export const getOneUser = async (userId: string) => {
  const response = await axios.get(`/users/${userId}`);
  return response.data as UserWithAll;
};

export const updateUser = async (userId: string, userData: UpdateUserData) => {
  try {
    const response = await axios.put(`/users/${userId}`, userData);
    return response.data as User;
  } catch (error) {
    console.log(error);
  }
};

export const inviteMember = async (inviteData: {
  projectId: string;
  projectName: string;
  newMemberEmail: string;
  senderEmail: string;
  message?: string;
}) => {
  try {
    const response = await axios.post(
      `/projects/${inviteData.projectId}/invite`,
      {
        message: inviteData.message,
        newMemberEmail: inviteData.newMemberEmail,
        senderEmail: inviteData.senderEmail,
        projectName: inviteData.projectName,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// export const removeMemberFromProject = async (userId: string) => {
//   try {
//     const response = await axios.delete(`/users/${userId}`);
//     return response.data as User;
//   } catch (error) {
//     console.log(error);
//   }
// };
