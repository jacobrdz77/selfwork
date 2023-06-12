import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks } from "../utils/taskFunctions";
import { useUserStore } from "../store/user";
import { Priority, Task, TaskStatus, User } from "@prisma/client";

export const useTasks = (onSuccess?: () => void) => {
  const userId = useUserStore((state) => state.userId);
  const {
    data: tasks,
    isLoading,
    status,
  } = useQuery(["tasks", userId], () => getTasks(userId!), {
    onSuccess: onSuccess,
  });
  return { tasks, isLoading, status };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData: {
      name: string;
      description: string;
      assignee: User | null;
      priority: Priority | null;
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

    onSuccess: (newTask) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      console.log("Created new task...\n", newTask);
    },
  });
};

type TaskData = {
  name?: string;
  description?: string;
  priority?: Priority;
  status?: TaskStatus;
  isComplete?: boolean;
  startDate?: Date | null;
  dueDate?: Date | null;
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
        return (await response.json()) as Task;
      } catch (error) {
        console.log(error);
      }
    },

    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Updated task: ", updatedTask);
    },
  });
};

export const useDeleteTask = () => {
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
        console.log(error);
      }
    },

    onSuccess: (deletedTask) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Deleted task: ", deletedTask);
    },
  });
};
