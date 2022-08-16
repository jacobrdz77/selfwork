import { Priority, Project } from "@prisma/client";

// Get all projects
export const getProjects = async (userId: string) => {
  const response = await fetch(`/api/projects/${userId}`);
  const projects = await response.json();
  return projects;
};

// Get one project
export const getOneProject = async (id: string) => {
  const response = await fetch(`/api/projects/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const project = await response.json();
  return project;
};

// Create a new project
export const createProject = async (projectData: Project) => {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-type": "applicatoin/json",
    },
    body: {
      //@ts-ignore
      projectData: projectData,
    },
  });
  const newProject = await response.json();
  return newProject;
};

interface UpdateProjectData {
  id: number;
  name?: string;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
  clientsId?: string;
  hourlyRate?: number;
  priority?: Priority;
}

// Update a project
export const updateProject = async (projectData: UpdateProjectData) => {
  fetch("/api/projects", {
    method: "PUT",
    headers: {
      "Content-type": "applicatoin/json",
    },
    body: {
      //@ts-ignore
      projectData: projectData,
    },
  }).then((res) => res.json());
};
