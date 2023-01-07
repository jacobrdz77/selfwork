import { useQuery } from "@tanstack/react-query";
import { getTaskLists } from "../utils/taskListFunction";
import { useUserStore } from "../store/user";

const useTaskLists = (onSuccess?: () => void) => {
  const userId = useUserStore((state) => state.userId);
  const {
    data: taskLists,
    isLoading,
    status,
  } = useQuery(["task-list", userId], () => getTaskLists(userId!), {
    onSuccess: onSuccess,
  });
  return { taskLists, isLoading, status };
};

export default useTaskLists;
