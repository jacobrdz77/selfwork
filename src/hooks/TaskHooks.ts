import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks } from "../utils/taskFunctions";
import { useUserStore } from "../store/user";
import { Priority, Task, User } from "@prisma/client";

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