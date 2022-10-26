import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { getTasks } from "../lib/taskFunctions";
import { userIdAtom } from "../store/user";

const useTasks = (onSuccess?: () => void) => {
  const userId = useAtomValue(userIdAtom);
  console.log("UserId: ", userId);
  const {
    data: tasks,
    isLoading,
    status,
  } = useQuery(["tasks", userId], () => getTasks(userId), {
    onSuccess: onSuccess,
  });
  return { tasks, isLoading, status };
};

export default useTasks;
