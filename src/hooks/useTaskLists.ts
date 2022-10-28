import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { getTaskLists } from "../lib/tasksListFunctions";
import { userIdAtom } from "../store/user";

const useTaskLists = (onSuccess?: () => void) => {
  const userId = useAtomValue(userIdAtom);
  console.log("UserId: ", userId);
  const {
    data: taskLists,
    isLoading,
    status,
  } = useQuery(["task-list", userId], () => getTaskLists(userId), {
    onSuccess: onSuccess,
  });
  return { taskLists, isLoading, status };
};

export default useTaskLists;
