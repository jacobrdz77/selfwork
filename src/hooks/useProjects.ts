import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../utils/projectsFunctions";
import { useUserStore } from "../store/user";

const useProjects = (onSuccess?: () => void) => {
  const userId = useUserStore((state) => state.userId);
  const {
    data: projects,
    isLoading,
    status,
  } = useQuery(["projects", userId], () => getProjects(userId!), {
    onSuccess: onSuccess,
  });

  return {
    projects,
    isLoading,
    status,
  };
};

export default useProjects;
