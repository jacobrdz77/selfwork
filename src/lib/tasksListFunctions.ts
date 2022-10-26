import { Task, TaskList } from "@prisma/client";
import axios from "axios";
type newTaskList = {
  name: string;
  notes: string;
  projectId: string;
  projectName: string;
};

// Get all tasks
export const getTaskLists = async (userId: string) => {
  const allTaskLists = await axios.get("/api/tasks", {
    data: {
      userId,
    },
  });
  return allTaskLists.data as TaskList[];
};

// Transform all fetches to axio calls
// Create a new task
export const createTaskList = async (taskList: newTaskList) => {
  const newTaskList = await axios.post("/api/task-list", { taskList });
  return newTaskList.data as TaskList;
};

// Get one task
export const getOneTaskList = async (taskListId: string) => {
  const taskList = await axios.get(`/api/task-list/${taskListId}`);
  return taskList.data as TaskList;
};

// Update a task
export const updateTaskList = async (
  taskListId: string,
  taskListData: newTaskList
) => {
  const updatedTaskList = await axios.put(`/api/task-list/${taskListId}`, {
    taskListData,
  });
  return updatedTaskList.data as TaskList;
};
