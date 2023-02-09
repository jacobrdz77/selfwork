import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Section, Task } from "@prisma/client";
import { useUserStore } from "store/user";
import { SectionWithTasks, UserSections } from "@/types/types";

export const useSectionsOfProject = (projectId: string) => {
  const { data: projectSections, status } = useQuery({
    queryKey: ["sections", projectId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/sections?projectId=${projectId}`);
        return (await response.json()) as SectionWithTasks[];
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => {
      console.log("Error: ", error);
    },
    onSuccess: (sections) => {
      console.log("Fetched sections of project: ", sections);
    },
    enabled: projectId == undefined ? false : true,
  });
  return { projectSections, status };
};

export const useSectionsOfUser = () => {
  // Future: fetch userId from session
  const userId = useUserStore((state) => state.userId);

  const { data, status } = useQuery({
    queryKey: ["sections", userId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/sections?userId=${userId}`);
        return (await response.json()) as UserSections;
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => {
      console.log("Error: ", error);
    },
    onSuccess: (sections) => {
      console.log("Fetched sections of user: ", sections);
    },
    enabled: userId == undefined ? false : true,
  });
  return {
    userSections: data?.userSections,
    userAssignedTasksSection: data?.userAssignedTasksSection,
    status,
  };
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

        return (await response.json()) as Section;
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

export const useDeleteSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sectionId: string) => {
      try {
        const response = await fetch(`/api/sections/${sectionId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Deleted section: ", data.deletedSection);
    },
  });
};
export const useUpdateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      sectionId,
      sectionData,
    }: {
      sectionId: string;
      sectionData: { name: string };
    }) => {
      try {
        const response = await fetch(`/api/sections/${sectionId}`, {
          method: "PUT",
          body: JSON.stringify({
            sectionData: {
              name: sectionData.name,
            },
          }),
        });

        return (await response.json()) as Section;
      } catch (error) {
        console.log(error);
      }
    },

    onSuccess: (updatedSection) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Updated section: ", updatedSection?.name);
    },
  });
};
