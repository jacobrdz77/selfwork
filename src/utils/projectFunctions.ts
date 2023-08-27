import { Project } from "@prisma/client";
import axios from "axios";
import { NewProject, ProjectWithAll, UpdateProjectData } from "../types/types";

// GET ALL
export const getProjects = async (workspaceId: string) => {
  try {
    const response = await fetch(`/api/workspaces/${workspaceId}/projects`);

    if (!response.ok) {
      throw new Error("Error happend!: " + response.status.toLocaleString());
    }

    return (await response.json()) as Project[];
  } catch (error) {
    throw error;
  }
};

// GET ONE
export const getOneProject = async (projectId: string) => {
  try {
    const response = await fetch(`/api/projects/${projectId}`);

    if (!response.ok) {
      throw new Error("Error happend!: " + response.status.toLocaleString());
    }

    return (await response.json()) as ProjectWithAll;
  } catch (error) {
    throw error;
  }
};

// POST
export const createProject = async (project: NewProject) => {
  try {
    const response = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({
        project: { ...project },
      }),
    });

    if (!response.ok) {
      throw new Error("Error happend!: " + response.status.toLocaleString());
    }

    return (await response.json()) as Project;
  } catch (error) {
    console.log(error);
  }
};

// UPDATE
export const updateProject = async (
  projectId: string,
  projectData: UpdateProjectData
) => {
  try {
    const response = await fetch(`/api/projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectData: projectData,
      }),
    });
    if (!response.ok) {
      throw new Error("Error happend!: " + response.status.toLocaleString());
    }
    return (await response.json()) as Project;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// DELETE
export const deleteProject = async (projectId: string) => {
  const deletedproject = await axios.delete(`/api/projects/${projectId}`);
  return deletedproject.data as Project;
};

// ***** Server Functions

// Transforms the data from frontend to a valid new Project (so that prisma doesn't complain)
export const transformProjectData = ({
  name,
  description,
  dueDate,
  lumpSum,
  priority,
  startDate,
  workspaceId,
  ownerId,
  clientId,
}: NewProject) => {
  return {
    name,
    priority,
    workspaceId,
    ownerId,
    description: description.trim().length === 0 ? null : description,
    lumpSum: lumpSum === 0 ? null : lumpSum,
    startDate: startDate.length === 0 ? null : new Date(startDate),
    dueDate: dueDate.length === 0 ? null : new Date(dueDate),
    clientId,
  };
};
