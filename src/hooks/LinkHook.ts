import { NewLink } from "@/types/types";
import { createLink, deleteLink, getLinks } from "@/utils/linkFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useCreateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (linkData: NewLink) => createLink(linkData),

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
    mutationFn: (linkId: string) => deleteLink(linkId),

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["links"] });
      console.log("Deleted Task");
    },
  });
};
