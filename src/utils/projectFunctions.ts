import { Project } from "@prisma/client";
import {
  NewProject,
  ProjectWithAll,
  ProjectsWithSections,
  UpdateProjectData,
} from "../types/types";
import { axios } from "libs/axios";

export const getProjects = async (workspaceId: string) => {
  try {
    // Todo: Replace when new backend is finished
    // const response = await axios.get(`/projects?workspaceId=${workspaceId}`);
    const response = await axios.get(`/workspaces/${workspaceId}/projects`);

    return response.data as Project[];
  } catch (error) {
    console.log(error);
  }
};

export const getProjectsWithSections = async (workspaceId: string) => {
  try {
    // Todo: Replace when new backend is finished
    // const response = await axios.get(`/projects?workspaceId=${workspaceId}`);
    const response = await axios.get(
      `/workspaces/${workspaceId}/projects?sections=true`
    );

    return response.data as ProjectsWithSections;
  } catch (error) {
    console.log(error);
  }
};

export const getOneProject = async (projectId: string) => {
  try {
    const response = await axios.get(`/projects/${projectId}`);

    return response.data as ProjectWithAll;
  } catch (error) {
    console.log(error);
  }
};

export const createProject = async (project: NewProject) => {
  try {
    const response = await axios.post("/projects", { project });

    return response.data as Project;
  } catch (error) {
    console.log(error);
  }
};

export const updateProject = async (
  projectId: string,
  projectData: UpdateProjectData
) => {
  try {
    const response = await axios.put(`/projects/${projectId}`, {
      projectData,
    });
    return response.data as Project;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = async (projectId: string) => {
  const response = await axios.delete(`/projects/${projectId}`);
  return response.data as Project;
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
