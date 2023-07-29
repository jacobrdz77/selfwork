import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Section, Task } from "@prisma/client";
import { useUserStore } from "store/user";
import { ProjectSections, SectionWithTasks, UserSections } from "@/types/types";

export const useSectionsOfProject = (projectId: string) => {
  const { data: projectSections, status } = useQuery({
    queryKey: ["sections", projectId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/sections?projectId=${projectId}`);
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
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
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as UserSections;
      } catch (error) {
        console.log(error);
      }
    },
    onError: (error) => {
      console.log("Error: ", error);
    },
    enabled: userId == undefined ? false : true,
  });
  return {
    userSections: data?.userSections,
    userAssignedTasksSection: data?.userAssignedTasksSection,
    status,
  };
};

export const useCreateProjectSection = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sectionData: { name: string; order: number }) => {
      try {
        console.log("CLICKKK");
        const response = await fetch(`/api/sections?projectId=${projectId}`, {
          method: "POST",
          body: JSON.stringify({
            sectionData: {
              ...sectionData,
            },
          }),
        });
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }

        return (await response.json()) as SectionWithTasks;
      } catch (error) {
        console.log(error);
      }
    },

    // Optimistically updates userSections

    onSettled: (newSection) => {
      console.log("Created new section! \n", newSection);
      queryClient.invalidateQueries({ queryKey: ["sections", projectId] });
    },
  });
};

export const useCreateUserSection = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.userId);

  return useMutation({
    mutationFn: async (sectionData: { name: string; order: number }) => {
      try {
        const response = await fetch(`/api/sections?userId=${userId}`, {
          method: "POST",
          body: JSON.stringify({
            sectionData: { ...sectionData },
          }),
        });
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as SectionWithTasks;
      } catch (error) {
        console.log(error);
      }
    },

    // Optimistically updates userSections
    onMutate: async (newSection) => {
      await queryClient.cancelQueries(["sections", userId]);

      const previousSections = queryClient.getQueryData<UserSections>([
        "sections",
        userId,
      ]);
      console.log("PREVIOUS sections", previousSections);

      if (previousSections) {
        queryClient.setQueryData<UserSections>(["sections", userId], {
          ...previousSections,
          userSections: [
            // @ts-ignore
            ...previousSections.userSections,
            // @ts-ignore
            { id: Math.random().toString(), name: newSection.name, tasks: [] },
          ],
        });
      }

      // Adds to the context in onError function
      return { previousSections };
    },

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.previousSections) {
        queryClient.setQueryData<UserSections>(
          ["sections", userId],
          context?.previousSections
        );
      }
    },

    onSettled: (newSection) => {
      console.log("Created new section! \n", newSection);
      queryClient.invalidateQueries({ queryKey: ["sections", userId] });
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
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Deleted section: ", data.deletedSection.name);
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
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
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
