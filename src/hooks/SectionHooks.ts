import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../store/user";
import { Task } from "@prisma/client";

export const useSections = (onSuccess?: () => void) => {
  const userId = useUserStore((state) => state.userId);
  const { data: tasks, isLoading, status } = useQuery({});
  return { tasks, isLoading, status };
};

export const useCreateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sectionData) => {
      try {
        const response = await fetch("/api/sections", {
          method: "POST",
          body: JSON.stringify({
            task: { sectionData },
          }),
        });

        return (await response.json()) as Task;
      } catch (error) {
        console.log(error);
      }
    },

    onSuccess: (newSection) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Created new section! \n", newSection);
    },
  });
};
