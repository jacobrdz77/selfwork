import { useUserStore } from "../store/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NewClientData, UpdateClientData } from "../types/types";
import {
  createClient,
  deleteClient,
  getClients,
  getOneClient,
  updateClient,
} from "@/utils/clientFunctions";
import { toast } from "react-hot-toast";

export const useClients = (onSuccess?: () => void) => {
  const userId = useUserStore((state) => state.userId);
  const {
    data: clients,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(userId!),
    onSuccess: onSuccess,
  });
  return { clients, isLoading, status };
};

export const useOneClient = (clientId: string) => {
  const { data: client, status } = useQuery({
    queryKey: ["clients", clientId],
    queryFn: () => getOneClient(clientId),
  });

  return {
    client,
    status,
  };
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.userId);

  // Todo: Uncomment when auth is created
  // const userId = useSession().data?.user?.id;

  return useMutation({
    mutationFn: (clientData: NewClientData) => createClient(clientData, userId),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["clients"],
      });

      toast.success("Created client: " + data?.name);
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientId: string) => deleteClient(clientId),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Deleted client: " + data?.name);
    },
  });
};

export const useUpdateClient = (clientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ clientData }: { clientData: UpdateClientData }) =>
      updateClient(clientId, clientData),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
