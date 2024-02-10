import { NewSketchData, UpdateSketchData } from "@/types/types";
import {
  createSketch,
  deleteSketch,
  getOneSketch,
  getProjectSketches,
  updateSketch,
} from "@/utils/sketchFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userStore } from "store/user";

const sketchKeys = {
  all: ["sketches"] as const,
  one: (id: string) => [...sketchKeys.all, id] as const,
};

export const useCreateSketch = () => {
  const queryClient = useQueryClient();
  const authorId = userStore.getState().userId;

  return useMutation({
    mutationFn: (sketchData: { projectId: string }) =>
      createSketch({ projectId: sketchData.projectId, authorId }),

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: sketchKeys.all,
      });

      // console.log("Created Sketch: ", data);
    },
  });
};

export const useOneSketch = (sketchId: string) => {
  const { data: sketch, status } = useQuery({
    queryKey: sketchKeys.one(sketchId),
    queryFn: () => getOneSketch(sketchId),
    onSuccess: async (data) => {
      console.log("Fetched sketch: ", data);
    },
    enabled: sketchId ? true : false,
  });
  return { sketch, status };
};
export const useProjectSketches = (projectId: string) => {
  const { data: sketches, status } = useQuery({
    queryKey: sketchKeys.all,
    queryFn: () => getProjectSketches(projectId),
    onSuccess: async (data) => {
      console.log("Fetched Project Sketches: ", data);
    },
    enabled: projectId == undefined ? false : true,
  });
  return { sketches, status };
};

export const useDeleteSketch = (sketchId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteSketch(sketchId),

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: sketchKeys.all,
      });

      // console.log("Deleted Sketch: ", data);
    },
  });
};

export const useUpdateSketch = (sketchId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sketchData: UpdateSketchData) =>
      updateSketch(sketchId, sketchData),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: sketchKeys.all });
      console.log("Updated Sketch: ", data);
    },
  });
};
