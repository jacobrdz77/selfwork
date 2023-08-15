import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOneTask, getTasks } from "../utils/taskFunctions";
import { useUserStore } from "../store/user";
import { Priority, Section, Task, TaskStatus, User } from "@prisma/client";
import { TaskWithAssignee } from "@/types/types";

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
export const useOneTask = (taskId: string) => {
  const {
    data: task,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => getOneTask(taskId!),
    onSuccess: (data) => {
      // console.log("Task: ", data);
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

    onSuccess: (newTask) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Created new task...\n", newTask);
    },
  });
};

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
    onMutate: async (updatedTask: TaskWithAssignee) => {
      await queryClient.cancelQueries({ queryKey: ["task"] });

      // Snapshot the previous value
      const previousTask = await queryClient.getQueryData([
        "tasks",
        updatedTask.id,
      ]);

      // Optimistically update to the new value
      await queryClient.setQueryData(["tasks", updatedTask.id], updatedTask);

      return { previousTask, updatedTask };
    },
    onSuccess: (updatedTask: TaskWithAssignee) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["sections", updatedTask?.sectionId],
      // });
      queryClient.invalidateQueries({ queryKey: ["tasks", updatedTask.id] });
      console.log("SUCCESS");
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
        console.log(error);
      }
    },

    onSuccess: (twoUpdatedSections) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Updated section: ", twoUpdatedSections);
    },
  });
};
