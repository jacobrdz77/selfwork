import { Priority, Project } from "@prisma/client";
import axios from "axios";
interface NewprojectData {
  name: string;
  description: string;
  clientId: string;
  hourlyRate: number;
  priority: Priority;
  startDate: string | Date;
  dueDate: string | null | Date;
  userId: string;
}

// GET ALL
export const getProjects = async (userId: string) => {
  try {
    const response = await fetch(`/api/projects?userId=${userId}`);
    return (await response.json()) as Project[];
  } catch (error) {
    throw error;
  }
};

// GET ONE
export const getOneProject = async (projectId: string) => {
  try {
    const response = await fetch(`/api/projects/${projectId}`);
    return (await response.json()) as Project;
  } catch (error) {
    throw error;
  }
};

// NEW
export const createProject = async (project: NewprojectData) => {
  const newproject = await axios.post("/api/projects", { project });
  return newproject.data as Project;
};

export type UpdateProjectData = {
  id: number;
  name?: string;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
  clientId?: string;
  hourlyRate?: number;
  priority?: Priority;
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
