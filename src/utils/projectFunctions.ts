import { Priority, Project, Task } from "@prisma/client";
import axios from "axios";
import {
  NewProjectData,
  ProjectWithAll,
  UpdateProjectData,
} from "../types/types";

// GET ALL
export const getProjects = async (workspaceId: string) => {
  try {
    const response = await fetch(`/api/workspaces/${workspaceId}/projects`);
    return (await response.json()) as Project[];
  } catch (error) {
    throw error;
  }
};

// GET ONE
// Todo: Make new Project return type with notes and members
export const getOneProject = async (projectId: string) => {
  try {
    const response = await fetch(`/api/projects/${projectId}`);
    return (await response.json()) as ProjectWithAll;
  } catch (error) {
    throw error;
  }
};

// NEW
export const createProject = async (project: NewProjectData) => {
  try {
    const response = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({
        project: { ...project },
      }),
    });

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
  const updatedproject = await axios.put(`/api/projects/${projectId}`, {
    data: {
      projectData,
    },
  });
  return updatedproject.data as Project;
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
}: NewProjectData) => {
  return {
    name,
    priority,
    workspaceId,
    ownerId,
    description: description.trim().length === 0 ? null : description,
    lumpSum: lumpSum === 0 ? null : lumpSum,
    startDate: startDate.length === 0 ? null : new Date(startDate),
    dueDate: dueDate.length === 0 ? null : new Date(dueDate),
  };
};
