import { Project, Task, User } from "@prisma/client";
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

const inviteMember = async ({
  projectId,
  newMemberEmail,
  senderEmail,
  message,
  projectName,
}: {
  projectId: string;
  projectName: string;
  newMemberEmail: string;
  senderEmail: string;
  message?: string;
}) => {
  try {
    const response = await fetch(`/api/projects/${projectId}/invite`, {
      method: "POST",
      body: JSON.stringify({
        message,
        newMemberEmail,
        senderEmail,
        projectName,
      }),
    });

    if (!response.ok) {
      throw new Error("Error happend!: " + response.status.toLocaleString());
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

interface UpdateUserData {
  name: string | null;
  email: string | null;
  phone: string | null;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      userData,
    }: {
      userId: string;
      userData: UpdateUserData;
    }) => {
      try {
        const response = await fetch(`/api/user/${userId}`, {
          method: "PUT",
          body: JSON.stringify({
            userData: userData,
          }),
        });

        if (!response.ok) {
          throw Error("Error happend!: " + response.status.toLocaleString());
        }
        return (await response.json()) as User;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useUserInfo = (userId: string) => {
  const session = useSession();
  console.log(session);
  const { data, status } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
  });

  return {
    user: { ...data },
    session: { ...session.data?.user },
    status,
    sessionStatus: session.status,
  };
};

type UserWithAll = User & {
  assignedTasks: Task[];
  involvedProjects: Project[];
};

const getUser = async (userId: string) => {
  try {
    const response = await fetch(`/api/user/${userId}`);

    if (!response.ok) {
      throw new Error("Error happend!: " + response.status.toLocaleString());
    }

    return (await response.json()) as UserWithAll;
  } catch (error) {
    console.log(error);
  }
};
