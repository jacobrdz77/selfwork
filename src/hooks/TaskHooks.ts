import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  getOneTask,
  getSectionTasks,
  getUserTasks,
  updateTask,
  updateTaskOrder,
} from "../utils/taskFunctions";
import { useUserStore } from "../store/user";
import {
  NewTaskData,
  SectionWithTasks,
  TaskData,
  TaskWithAssignee,
} from "@/types/types";
import { useEffect, useState } from "react";
import sortArrayByOrder from "@/utils/sortArrayByOrder";

function generateId() {
  return Math.floor(Math.random() * 100) + "";
}

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
    mutationFn: async (taskData: NewTaskData) => createTask(taskData),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      // Snapshot the previous value
      let previousTasks = (await queryClient.getQueryData([
        "tasks",
        newTask.sectionId,
      ])) as [];

      if (!previousTasks) {
        previousTasks = [];
      }

      // Optimistically update
      queryClient.setQueryData(
        ["tasks", newTask.sectionId],
        [...previousTasks, { ...newTask, id: generateId() }]
      );
      return { previousTasks, newTask };
    },

    onSuccess: (newTask) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Created new task...\n", newTask);
    },
  });
};

export const useUpdateTask = (sectionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      taskData,
    }: {
      taskId: string;
      taskData: TaskData;
    }) => updateTask(taskId, taskData),
    onMutate: async (data: {
      taskId: string;
      taskData: TaskData;
      projectId: string;
    }) => {
      const updatedTask = data.taskData;
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      // console.log("NEW task: ", updatedTask.name);

      // Snapshot the previous value
      // This is gonna be hella messy LOL
      const previousTasks = queryClient
        .getQueryData<SectionWithTasks[]>(["sections", data.projectId])
        ?.find((section) => section.id === sectionId)
        ?.tasks.filter((task) => task.id !== data.taskId);
      // console.log("prev: ", previousTasks);

      const oldTask = queryClient
        .getQueryData<SectionWithTasks[]>(["sections", data.projectId])
        ?.find((section) => section.id === sectionId)
        ?.tasks.find((task) => task.id === data.taskId);

      // console.log("OldTask: ", oldTask?.name);

      // const previousTasks = await queryClient
      //   .getQueryData<SectionWithTasks[]>(["tasks", sectionId])
      //   ?.filter((task) => task.id !== data.taskId);

      // console.log("prev: ", previousTasks);
      // const oldTask = queryClient
      //   .getQueryData<SectionWithTasks[]>(["tasks", sectionId])
      //   ?.find((task) => task.id === data.taskId);
      // console.log("OldTask: ", oldTask);

      // Optimistically update to the new value
      if (previousTasks) {
        queryClient.setQueryData(
          ["sections", data.projectId],
          (sections: SectionWithTasks[]) => {
            const currSection = sections?.find(
              (section) => section.id === sectionId
            )!;

            currSection.tasks = [
              ...previousTasks,
              { id: generateId(), ...updatedTask },
            ];

            return [...sections];
          }
          // [...previousTasks!, { id: generateId(), ...oldTask, ...updatedTask }]
        );
      }

      return { previousTasks, oldTask };
    },
    onSuccess: (updatedTask: TaskWithAssignee) => {
      queryClient.invalidateQueries({
        queryKey: ["sections"],
      });
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
        id: string;
        currentOrder: number;
        newOrder: number;
      };
    }) => updateTaskOrder(taskData),

    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      console.log("Updated task order: ", updatedTask);
    },
  });
};

export const useDeleteTask = (sectionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => deleteTask(taskId),

    onMutate: async (deletedTaskId: string) => {
      await queryClient.cancelQueries({ queryKey: ["task"] });

      // console.log("Deleted Task ID: ", deletedTaskId);

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<TaskWithAssignee[]>([
        "tasks",
        sectionId,
      ]);
      // console.log("Previous Tasks: ", previousTasks);

      // Optimistically update
      const deletedTask = queryClient.setQueryData(
        ["tasks", sectionId],
        previousTasks?.filter((task) => task.id !== deletedTaskId)
      );
      // console.log("Updated Tasks: ", deletedTask);
      return { previousTasks, deletedTask };
    },

    onSuccess: (deletedTask) => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      console.log("Deleted task: ", deletedTask);
    },
  });
};

export const useSortedTasks = (tasks: TaskWithAssignee[]) => {
  const [sortedTasks, setSortedTasks] = useState(sortArrayByOrder(tasks));

  // Need this but need to find better way
  useEffect(() => {
    setSortedTasks(sortArrayByOrder(tasks));
  }, [tasks]);

  return { sortedTasks, setSortedTasks };
};
