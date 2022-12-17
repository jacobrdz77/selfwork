import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../utils/taskFunctions";
import { useUserStore } from "../store/user";

const useTasks = (onSuccess?: () => void) => {
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

export default useTasks;
