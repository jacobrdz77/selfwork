import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { getProjects } from "../lib/projectsFunctions";
import { userIdAtom } from "../store/user";

const useProjects = (onSuccess?: () => void) => {
  const userId = useAtomValue(userIdAtom);
  const {
    data: projects,
    isLoading,
    status,
  } = useQuery(["projects", userId], () => getProjects(userId), {
    onSuccess: onSuccess,
  });

  return {
    projects,
    isLoading,
    status,
  };
};

export default useProjects;
