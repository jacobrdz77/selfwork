import { useQuery } from "@tanstack/react-query";
import { getClients } from "../utils/clientFunctions";
import { useUserStore } from "../store/user";

const useClients = (onSuccess?: () => void) => {
  const userId = useUserStore((state) => state.userId);
  const {
    data: clients,
    isLoading,
    status,
  } = useQuery(["clients"], () => getClients(userId!), {
    onSuccess: onSuccess,
  });
  return { clients, isLoading, status };
};

export default useClients;
