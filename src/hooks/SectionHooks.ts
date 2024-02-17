import { useEffect, useState } from "react";
import sortSections from "@/utils/sortArrayByOrder";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Section } from "@prisma/client";
import { useUserStore } from "store/user";
import { ProjectSections, SectionWithTasks, UserSections } from "@/types/types";
import {
  createProjectSection,
  createUserSection,
  deleteSection,
  getSectionsofProject,
  getSectionsofUser,
  updateSection,
  updateSectionOrder,
} from "@/utils/sectionFunctions";

export const useSectionsOfProject = (projectId: string) => {
  const { data: projectSections, status } = useQuery({
    queryKey: ["sections", projectId],
    queryFn: () => getSectionsofProject(projectId),
    onError: (error) => {
      console.log("Error: ", error);
    },
    onSuccess: (sections) => {
      if (process.env.NODE_ENV === "development") {
        console.log("Fetched sections of project: ", sections);
      }
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
    queryFn: () => getSectionsofUser(userId),
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
    mutationFn: (sectionData: { name: string; order: number }) =>
      createProjectSection(projectId, sectionData),

    onMutate: async (newSection) => {
      await queryClient.cancelQueries(["sections", projectId]);
      console.log("NEEEE ", newSection);

      const previousSections = queryClient.getQueryData<ProjectSections[]>([
        "sections",
        projectId,
      ]);
      // console.log("PREVIOUS sections", previousSections);

      if (previousSections) {
        const newSections = queryClient.setQueryData<ProjectSections[]>(
          ["sections", projectId],
          [
            ...previousSections,
            {
              id: Math.floor(Math.random() * 100).toString(),
              name: newSection.name,
              tasks: [],
            },
          ]
        );
      }

      return { previousSections };
    },

    onSettled: (newSection) => {
      if (process.env.NODE_ENV === "development") {
        console.log("Created new section! \n", newSection);
      }
      queryClient.invalidateQueries({ queryKey: ["sections", projectId] });
    },
  });
};

export const useCreateUserSection = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.userId);

  return useMutation({
    mutationFn: async (sectionData: { name: string; order: number }) =>
      createUserSection(userId, sectionData),

    // Optimistically updates userSections
    onMutate: async (newSection) => {
      await queryClient.cancelQueries(["sections", userId]);

      const previousSections = queryClient.getQueryData<UserSections>([
        "sections",
        userId,
      ]);
      // console.log("PREVIOUS sections", previousSections);

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
      if (process.env.NODE_ENV === "development") {
        console.log("Created new section! \n", newSection);
      }

      queryClient.invalidateQueries({ queryKey: ["sections", userId] });
    },
  });
};

export const useDeleteSection = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sectionId: string) => deleteSection(sectionId),

    // Optimistically updates userSections
    onMutate: async (deletedSectionId: string) => {
      await queryClient.cancelQueries(["sections"]);

      const previousSections = queryClient.getQueryData<Section[]>([
        "sections",
        projectId,
      ]);

      if (previousSections) {
        // This filters out the deleted section
        queryClient.setQueryData<ProjectSections>(
          ["sections", projectId],
          previousSections.filter((section) => section.id !== deletedSectionId)
        );
      }

      // Adds to the context in the onError function
      return { previousSections };
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Deleted Section Name: ", data?.name);
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
    }) => updateSection(sectionId, sectionData),

    onSuccess: (updatedSection) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Updated section: ", updatedSection?.name);
    },
  });
};

export const useUpdateSectionOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Todo: Uncomment when new backend is complete
    // mutationFn: async (sectionData: UpdateSectionBody) => {
    mutationFn: async ({
      sectionData,
    }: {
      sectionData: {
        id: string;
        currentOrder: number;
        newOrder: number;
      };
    }) => updateSectionOrder(sectionData),

    onSuccess: (twoUpdatedSections) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Updated section: ", twoUpdatedSections);
    },
  });
};

export const useSortedSections = (sections: SectionWithTasks[]) => {
  const [sortedSections, setSortedSections] = useState<SectionWithTasks[]>(
    sortSections(sections)
  );

  // Need this but need to find better way
  useEffect(() => {
    setSortedSections(sortSections(sections));
  }, [sections]);

  return { sortedSections, setSortedSections };
};
