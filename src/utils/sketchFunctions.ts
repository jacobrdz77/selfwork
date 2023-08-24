import { Sketch } from "@prisma/client";

export const getProjectSketches = async (projectId: string) => {
  try {
    const response = await fetch(`/api/projects/${projectId}/sketchs`);

    if (!response.ok) {
      throw new Error("Error happend!: " + response.status.toLocaleString());
    }

    return (await response.json()) as Sketch[];
  } catch (error) {
    throw error;
  }
};
export const getOneSketch = async (sketchId: string) => {
  try {
    const response = await fetch(`/api/sketchs/${sketchId}`);

    if (!response.ok) {
      throw new Error("Error happend!: " + response.status.toLocaleString());
    }

    return (await response.json()) as Sketch[];
  } catch (error) {
    throw error;
  }
};
// export const getProjectSketches = async (projectId: string) => {
//   try {
//     const response = await fetch(`/api/projects/${projectId}/sketchs`);

//     if (!response.ok) {
//       throw new Error("Error happend!: " + response.status.toLocaleString());
//     }

//     return (await response.json()) as Sketch[];
//   } catch (error) {
//     throw error;
//   }
// };
