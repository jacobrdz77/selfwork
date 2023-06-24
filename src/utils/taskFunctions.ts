import { TaskWithAssignee } from "@/types/types";
import { Task } from "@prisma/client";
import axios from "axios";
type newTask = {
  name: string;
  description: string;
  userId: string;
  isComplete: boolean;
  catagory: string;
  projectId: string;
};

// Get all tasks
export const getTasks = async (userId: string) => {
  const allTasks = await axios.get("/api/tasks", {
    data: {
      userId,
    },
  });
  return allTasks.data as Task[];
};

// Transform all fetches to axio calls
// Create a new task
export const createTask = async (task: newTask) => {
  const newtask = await axios.post("/api/tasks", { task });
  return newtask.data as Task;
};

// Get one task
export const getOneTask = async (taskId: string) => {
  const task = await axios.get(`/api/tasks/${taskId}`);
  return task.data as TaskWithAssignee;
};

// Update a task
export const updateTask = async (taskId: string, task: newTask) => {
  const updatedTask = await axios.put(`/api/tasks/${taskId}`, { task });
  return updatedTask.data as Task;
};
