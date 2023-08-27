import {
  createSketch,
  deleteSketch,
  getOneSketch,
  getProjectSketches,
  updateSketch,
} from "@/utils/sketchFunctions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type SketchData = {
  name?: string;
  elements: string;
};

type NewSketchData = { name: string; projectId: string };

const sketchKeys = {
  all: ["sketches"] as const,
  one: (id: string) => [...sketchKeys.all, id] as const,
};

export const useSketch = (sketchId: string) => {
  // const queryClient = useQueryClient();

  const {
    data: sketch,
    isLoading,
    status,
  } = useQuery({
    queryKey: sketchKeys.one(sketchId),
    queryFn: () => getOneSketch(sketchId),
    onSuccess: async (data) => {
      console.log("Fetched sketch: ", data);
    },
    enabled: sketchId == undefined ? false : true,
  });
  return { sketch, isLoading, status };
};
export const useProjectSketches = (projectId: string) => {
  // const queryClient = useQueryClient();

  const {
    data: sketches,
    // isLoading,
    status,
  } = useQuery({
    queryKey: sketchKeys.all,
    queryFn: () => getProjectSketches(projectId),
    onSuccess: async (data) => {
      console.log("Fetched Project Sketches: ", data);
    },
    enabled: projectId == undefined ? false : true,
  });
  return { sketches, status };
};

export const useCreateSketch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sketchData: NewSketchData) => createSketch(sketchData),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: sketchKeys.all,
      });

      console.log("Created Sketch: ", data);
    },
  });
};

export const useDeleteStuff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sketchId: string) => deleteSketch(sketchId),

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: sketchKeys.all,
      });

      console.log("Deleted Sketch: ", data);
    },
  });
};

export const useUpdateSketch = (sketchId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sketchData: SketchData) => updateSketch(sketchId, sketchData),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: sketchKeys.all });
      console.log("Updated Sketch: ", data);
    },
  });
};
