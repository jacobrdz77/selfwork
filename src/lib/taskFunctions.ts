import axios from "axios";

// Get all tasks
export const getTasks = async (userId: string) => {
  const allTasks = await axios.get("/api/tasks", {
    data: {
      userId,
    },
  });
  return allTasks.data;
};

type newTask = {
  name: string;
  description: string;
  userId: string;
  isComplete: boolean;
  catagory: string;
  projectId: string;
};

// Transform all fetches to axio calls
// create a new client
export const createtask = async (task: newTask) => {
  const newtask = await axios.post("/api/tasks", { task });
  return newtask.data;
};

// Get one task
export const getOnetask = async (taskId: string) => {
  const task = await axios.get(`/api/tasks/${taskId}`);
  return task.data;
};

// Update a task
export const updatetask = async (taskId: string, task: newTask) => {
  const updatedtask = await axios.put(`/api/tasks/${taskId}`, { task });
  return updatedtask.data;
};
