import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../store/user";
import { Priority, Tag, User } from "@prisma/client";

export const useTags = (tagId: string) => {
  const {
    data: tags,
    isLoading,
    status,
  } = useQuery({ queryKey: ["tags", tagId], queryFn: () => {} });

  return { tags, isLoading, status };
};
export const useOnetag = (tagId: string) => {
  const {
    data: tag,
    isLoading,
    status,
  } = useQuery({ queryKey: ["tags", tagId], queryFn: () => {} });
  return { tag, isLoading, status };
};

export const useCreatetag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tagData: {
      name: string;
      description: string;
      assignee: User | null;
      priority: Priority | null;
      sectionId?: string;
    }) => {
      try {
        const response = await fetch("/api/tags", {
          method: "POST",
          body: JSON.stringify({
            tag: { ...tagData },
          }),
        });
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as Tag;
      } catch (error) {
        console.log(error);
      }
    },

    onSuccess: (newtag) => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      console.log("Created new tag...\n", newtag);
    },
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tagId,
      tagData,
    }: {
      tagId: string;
      tagData: { name: string };
    }) => {
      try {
        const response = await fetch(`/api/tags/${tagId}`, {
          method: "PUT",
          body: JSON.stringify({
            tagData,
          }),
        });
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as Tag;
      } catch (error) {
        console.log(error);
      }
    },

    onSuccess: (updatedtag) => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tagId: string) => {
      try {
        const response = await fetch(`/api/tags/${tagId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as Tag;
      } catch (error) {
        console.log(error);
      }
    },

    onSuccess: (deletedtag) => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      console.log("Deleted tag: ", deletedtag);
    },
  });
};
