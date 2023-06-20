import { NewLink } from "@/types/types";
import { Link } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createLink = async (link: NewLink, projectId: string) => {
  try {
    const response = await fetch(`/api/projects/${projectId}/links`, {
      method: "POST",
      body: JSON.stringify({
        link: { ...link },
      }),
    });

    if (!response.ok) {
      throw new Error("Error happend!: " + response.status.toLocaleString());
    }

    return (await response.json()) as Link;
  } catch (error) {
    console.log(error);
  }
};

const getLinks = async (projectId: string) => {
  try {
    const response = await fetch(`/api/projects/${projectId}/links`);

    if (!response.ok) {
      throw new Error("Error happend!: " + response.status.toLocaleString());
    }

    return (await response.json()) as Link[];
  } catch (error) {
    throw error;
  }
};

export const useLinks = (projectId: string) => {
  const { data: links, status } = useQuery({
    queryKey: ["links"],
    queryFn: () => getLinks(projectId),
  });

  return {
    links,
    status,
  };
};

export const useCreateLink = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLinkData: NewLink) => createLink(newLinkData, projectId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["links"],
      });
    },
  });
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      linkId,
      projectId,
    }: {
      linkId: string;
      projectId: string;
    }) => {
      try {
        const response = await fetch(
          `/api/projects/${projectId}/links/${linkId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
      await queryClient.invalidateQueries({ queryKey: ["links"] });
      console.log("Deleted Task");
    },
  });
};
