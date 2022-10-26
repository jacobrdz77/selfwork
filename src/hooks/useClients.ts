import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { getClients } from "../lib/clientFunctions";
import { userIdAtom } from "../store/user";

const useClients = (onSuccess?: () => void) => {
  const userId = useAtomValue(userIdAtom);
  console.log("UserId: ", userId);
  const {
    data: clients,
    isLoading,
    status,
  } = useQuery(["clients"], () => getClients(userId), {
    onSuccess: onSuccess,
  });
  return { clients, isLoading, status };
};

export default useClients;
