import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../store/user";
import { Priority, Tag, User } from "@prisma/client";
import { createTag, deleteTag, updateTag } from "@/utils/tagFunctions";
import { NewTag, UpdateTagData } from "@/types/types";

export const useTags = (tagId: string) => {
  const {
    data: tags,
    isLoading,
    status,
  } = useQuery({ queryKey: ["tags", tagId], queryFn: () => {} });

  return { tags, isLoading, status };
};

export const useCreatetag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTag: NewTag) => createTag(newTag),

    onSuccess: (newTag) => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      console.log("New Tag: ", newTag);
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
      tagData: UpdateTagData;
    }) => updateTag(tagId, tagData),

    onSuccess: (updatedtag) => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tagId: string) => deleteTag(tagId),

    onSuccess: (deletedtag) => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      console.log("Deleted tag: ", deletedtag);
    },
  });
};
