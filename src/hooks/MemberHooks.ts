import { UpdateUserData, UserWithAll } from "@/types/types";
import { getOneUser, inviteMember, updateUser } from "@/utils/userFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useInviteMember = () => {
  return useMutation({
    mutationFn: async ({
      projectId,
      senderEmail,
      newMemberEmail,
      message,
      projectName,
    }: {
      projectId: string;
      projectName: string;
      newMemberEmail: string;
      senderEmail: string;
      message?: string;
    }) =>
      inviteMember({
        projectId,
        newMemberEmail,
        senderEmail,
        message,
        projectName,
      }),
    onSettled: (data) => {
      console.log("Invite sent! : ", data);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      userData,
    }: {
      userId: string;
      userData: UpdateUserData;
    }) => updateUser(userId, userData),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useUserInfo = (userId: string) => {
  const session = useSession();
  const { data, status } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getOneUser(userId),
  });

  return {
    user: { ...data },
    userSession: session,
    status,
    sessionStatus: session.status,
  };
};
