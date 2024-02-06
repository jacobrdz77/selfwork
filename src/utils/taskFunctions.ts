import { NewTaskData, TaskData, TaskWithAssignee } from "@/types/types";
import { Priority, Task, User } from "@prisma/client";
import { axios } from "libs/axios";

export const getUserTasks = async (userId: string) => {
  try {
    const response = await axios.get(`/tasks?userId=${userId}`);
    return response.data as TaskWithAssignee[];
  } catch (error) {
    console.log(error);
  }
};

export const getSectionTasks = async (sectionId: string) => {
  try {
    const response = await axios.get(`/tasks?sectionId=${sectionId}`);
    return response.data as TaskWithAssignee[];
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (task: NewTaskData) => {
  try {
    // For new backend
    // const response = await axios(
    //   `/api/sections/${taskData.sectionId}/tasks`,
    //   taskData
    // );
    const response = await axios.post("/tasks", task);
    return response.data as Task;
  } catch (error) {
    console.log(error);
  }
};

export const getOneTask = async (taskId: string) => {
  try {
    const response = await axios.get(`/tasks/${taskId}`);
    return response.data as Task;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (taskId: string, taskData: TaskData) => {
  try {
    const response = await axios.put(`/tasks/${taskId}`, taskData);
    return response.data as Task;
  } catch (error) {
    console.log(error);
  }
};

export const updateTaskOrder = async (taskData: {
  id: string;
  currentOrder: number;
  newOrder: number;
}) => {
  try {
    const response = await axios.put(
      `/tasks/${taskData.id}?order_change=true`,
      {
        currentOrder: taskData.currentOrder,
        newOrder: taskData.newOrder,
      }
    );
    return response.data as Task;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await axios.delete(`/tasks/${taskId}`);
    return response.data as Task;
  } catch (error) {
    console.log(error);
  }
};
