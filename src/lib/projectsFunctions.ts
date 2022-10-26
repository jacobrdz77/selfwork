import { Priority, Project } from "@prisma/client";
import axios from "axios";
interface NewProjectData {
  name: string;
  description: string;
  clientId: string;
  hourlyRate: number;
  priority: Priority;
  startDate: string;
  dueDate: string | null;
  userId: string;
}

// GET ALL
export const getProjects = async (userId: string) => {
  const projects = await axios.get("/api/projects", {
    data: {
      userId,
    },
  });
  return projects.data as Project[];
};

// GET ONE
export const getOneProject = async (projectId: string) => {
  const project = await axios.get(`/api/projects/${projectId}`);
  return project.data as Project;
};

// NEW
export const createProject = async (project: NewProjectData) => {
  const newProject = await axios.post("/api/projects", { project });
  return newProject.data as Project;
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
  const updatedProject = await axios.put(`/api/projects/${projectId}`, {
    data: {
      projectData,
    },
  });
  return updatedProject.data as Project;
};

// DELETE
export const deleteProject = async (projectId: string) => {
  const deletedProject = await axios.delete(`/api/projects/${projectId}`);
  return deletedProject.data as Project;
};
