import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOneTask,
  getSectionTasks,
  getUserTasks,
} from "../utils/taskFunctions";
import { useUserStore } from "../store/user";
import { Priority, Section, Task, TaskStatus, User } from "@prisma/client";
import { TaskWithAssignee } from "@/types/types";

export type TaskData = {
  name?: string;
  description?: string;
  priority?: Priority;
  status?: TaskStatus;
  isComplete?: boolean;
  startDate?: Date | null;
  dueDate?: Date | null;
  projectId?: string | null;
  assigneeId?: string | null;
};

// QUERY KEYS
// ONE task
// ["tasks", taskId]
// ALL tasks
// ["tasks", userId]

// Problem
// I need to fetch tasks based on sectionId

export const useTasksUser = () => {
  const userId = useUserStore((state) => state.userId);
  const {
    data: tasks,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => getUserTasks(userId!),
  });
  return { tasks, isLoading, status };
};
export const useTasksSection = (sectionId: string) => {
  const {
    data: tasks,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["tasks", sectionId],
    queryFn: () => getSectionTasks(sectionId),
  });
  return { tasks, isLoading, status };
};

export const useOneTask = (taskId: string) => {
  const {
    data: task,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => getOneTask(taskId!),
    // enabled: taskId.length > 2 ? true : false,
    onSuccess: (data) => {
      // console.log("Fetched ONE Task: ", data);
    },
  });
  return { task, isLoading, status };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData: {
      name: string;
      description: string;
      assignee: User | null;
      priority: Priority | null;
      order: number;
      sectionId?: string;
    }) => {
      try {
        const response = await fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify({
            task: { ...taskData },
          }),
        });
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as Task;
      } catch (error) {
        console.log(error);
      }
    },

    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["task"] });

      // console.log("New Task: ", newTask);

      // Snapshot the previous value
      const previousTasks = await queryClient.getQueryData([
        "tasks",
        newTask.sectionId,
      ]);
      // console.log("Previous Tasks: ", previousTasks);

      // Optimistically update
      const newTasks = queryClient.setQueryData(
        ["tasks", newTask.sectionId],
        [...previousTasks, { ...newTask, id: Math.floor(Math.random() * 100) }]
      );
      // console.log("Updated Tasks: ", newTasks);
      return { previousTasks, newTask };
    },

    onSuccess: (newTask) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Created new task...\n", newTask);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      taskData,
    }: {
      taskId: string;
      taskData: TaskData;
    }) => {
      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: "PUT",
          body: JSON.stringify({
            taskData: {
              ...taskData,
            },
          }),
        });
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as TaskWithAssignee;
      } catch (error) {
        console.log(error);
      }
    },
    onMutate: async (updatedTask: TaskWithAssignee) => {
      await queryClient.cancelQueries({ queryKey: ["task"] });

      // Snapshot the previous value
      const previousTask = await queryClient.getQueryData([
        "tasks",
        updatedTask.id,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(["tasks", updatedTask.id], updatedTask);

      return { previousTask, updatedTask };
    },
    onSuccess: (updatedTask: TaskWithAssignee) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["sections", updatedTask?.sectionId],
      // });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks", updatedTask.id] });
      console.log("SUCCESS");
    },
  });
};

export const useUpdateTaskOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskData,
    }: {
      taskData: {
        one: { id: string; order: number };
        two: { id: string; order: number };
      };
    }) => {
      try {
        console.log("SECTION DATA: ", taskData);
        const response = await fetch(
          `/api/tasks/${taskData.one.id}?second=${taskData.two.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              taskData,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as Section;
      } catch (error) {
        return error;
      }
    },

    onSuccess: (twoUpdatedSections) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Updated section: ", twoUpdatedSections);
    },
  });
};

export const useDeleteTask = (sectionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as Task;
      } catch (error) {
        return error;
      }
    },

    onMutate: async (deletedTaskId: string) => {
      await queryClient.cancelQueries({ queryKey: ["task"] });

      console.log("Deleted Task ID: ", deletedTaskId);

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<TaskWithAssignee[]>([
        "tasks",
        sectionId,
      ]);
      console.log("Previous Tasks: ", previousTasks);

      // Optimistically update
      const deletedTask = queryClient.setQueryData(
        ["tasks", deletedTaskId],
        previousTasks?.filter((task) => task.id !== deletedTaskId)
      );
      console.log("Updated Tasks: ", deletedTask);
      return { previousTasks, deletedTask };
    },

    onSuccess: (deletedTask) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      console.log("Deleted task: ", deletedTask);
    },
  });
};
