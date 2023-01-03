import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../store/user";
import { getProjects } from "../utils/projectFunctions";

const useProjects = (onSuccess?: () => any) => {
  const userId = useUserStore((state) => state.userId);
  const { data: projects, status } = useQuery(
    ["projects", userId],
    () => getProjects(userId!),
    {
      refetchOnWindowFocus: false,
      onSuccess,
    }
  );

  console.log("projects: ", projects);

  return {
    projects,
    status,
  };
};

export default useProjects;
