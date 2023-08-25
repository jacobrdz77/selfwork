import { Sketch } from "@prisma/client";

type SketchData = {
  name?: string;
  elements: string;
};

export const createSketch = async (sketchData: {
  name: string;
  projectId: string;
}) => {
  try {
    const response = await fetch(`/api/sketches`, {
      method: "POST",
      body: JSON.stringify({
        sketchData,
      }),
    });

    if (!response.ok) {
      throw Error("Error happend!: " + response.status.toLocaleString());
    }
    return (await response.json()) as Sketch;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectSketches = async (projectId: string) => {
  try {
    const response = await fetch(`/api/projects/${projectId}/sketches`);

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
    const response = await fetch(`/api/sketches/${sketchId}`);

    if (!response.ok) {
      throw new Error("Error happend!: " + response.status.toLocaleString());
    }

    return (await response.json()) as Sketch;
  } catch (error) {
    throw error;
  }
};

export const updateSketch = async (
  sketchId: string,
  sketchData: SketchData
) => {
  try {
    const response = await fetch(`/api/sketches/${sketchId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sketchData: { ...sketchData },
      }),
    });

    if (!response.ok) {
      throw new Error("Error happend!: " + response.status.toLocaleString());
    }

    return (await response.json()) as Sketch;
  } catch (error) {
    throw error;
  }
};

// DELETE
export const deleteSketch = async (sketchId: string) => {
  try {
    const response = await fetch(`/api/sketches/${sketchId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error happend!: " + response.status.toLocaleString());
    }
    return (await response.json()) as Sketch;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
