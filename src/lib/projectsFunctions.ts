import { Priority, Project } from "@prisma/client";
import axios from 'axios'
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

// Get all projects
export const getProjects = async (userId: string) => {
  const projects = await axios.get("/api/projects", {
    data: {
      userId
    }
  })
  return projects.data;
};

// Get one project
export const getOneProject = async (projectId: string) => {
 const project = await axios.get('/api/projects', { data: {projectId}})
  return project.data;
};


// Create a new project
export const createProject = async (project: NewProjectData) => {
  const newProject = await axios.post("/api/projects", {project})
  return newProject.data
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
export const updateProject = async(projectData: UpdateProjectData) => {
  const updatedProject = await axios.put('/api/projects', {
    data: {
      projectData
    }
  })
  return updatedProject;
};

export const deleteProject = async (projectId: string ) => {
  const deletedProject = await axios.delete('/api/projects', {
    data: {
      projectId
    }
  })
  
  return deletedProject
}

