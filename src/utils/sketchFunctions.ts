import { NewSketchData, UpdateSketchData } from "@/types/types";
import { Sketch } from "@prisma/client";
import { axios } from "libs/axios";
import { z } from "zod";

export const createSketch = async (sketchData: NewSketchData) => {
  try {
    const response = await axios.post(`/sketches`, sketchData);

    return response.data as Sketch;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectSketches = async (projectId: string) => {
  try {
    const response = await axios.get(`/projects/${projectId}/sketches`);

    return response.data as Sketch[];
  } catch (error) {
    console.log(error);
  }
};

export const getOneSketch = async (sketchId: string) => {
  try {
    const response = await axios.get(`/sketches/${sketchId}`);

    return response.data as Sketch;
  } catch (error) {
    console.log(error);
  }
};

export const updateSketch = async (
  sketchId: string,
  sketchData: UpdateSketchData
) => {
  try {
    const response = await axios.put(`/sketches/${sketchId}`, sketchData);
    return response.data as Sketch;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSketch = async (sketchId: string) => {
  try {
    const response = await axios.delete(`/sketches/${sketchId}`);
    return response.data as Sketch;
  } catch (error) {
    console.log(error);
  }
};

// Backend schemas
export const createSketchDataSchema = z.object({
  projectId: z.string(),
  authorId: z.string(),
});

export const updateSketchDataSchema = z.object({
  name: z.string().optional(),
  canvasState: z.any().optional(),
});
