import { Priority, Project } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// Get all projects
export const getProjects = async (userId: string) => {
  fetch("/api/projects", {
    method: "GET",
    headers: {
      "Content-type": "applicatoin/json",
    },
    body: {
      //@ts-ignore
      userId: userId,
    },
  })
    .then((res) => res.json())
    .then((data) => data.data);
};

// Get one project
export const getOneProject = async (id: string) => {
  fetch("/api/projects", {
    method: "GET",
    headers: {
      "Content-type": "applicatoin/json",
    },
    body: {
      //@ts-ignore
      id: id,
    },
  })
    .then((res) => res.json())
    .then((data) => data.data);
};

// Create a new project
export const createProject = async (projectData: Project) => {
  fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-type": "applicatoin/json",
    },
    body: {
      //@ts-ignore
      projectData: projectData,
    },
  })
    .then((res) => res.json())
    .then((data) => data.data);
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
  })
    .then((res) => res.json())
    .then((data) => data.data);
};
