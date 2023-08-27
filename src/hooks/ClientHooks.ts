import { getClients } from "@/utils/clientFunctions";
import { Client } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useUserStore } from "../store/user";
import {
  NewClientData,
  UpdateClientData
} from "../types/types";

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

async function getOneClient(clientId: string) {
  try {
    const response = await fetch(`/api/clients/${clientId}`);

    if (!response.ok) {
      throw Error("Error happend!: " + response.status.toLocaleString());
    }
    return (await response.json()) as Client;
  } catch (error) {
    console.log(error);
  }
}

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

  return useMutation({
    mutationFn: async (clientData: NewClientData) => {
      try {
        const response = await fetch(`/api/clients`, {
          method: "POST",
          body: JSON.stringify({
            client: {
              ...clientData,
              userId,
            },
          }),
        });

        if (!response.ok) {
          throw Error("Error happend!: " + response.status.toLocaleString());
        }
        return (await response.json()) as Client;
      } catch (error) {
        console.log(error);
      }
    },
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
    mutationFn: async (clientId: string) => {
      try {
        const response = await fetch(`/api/clients/${clientId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(
            "Error happend!: " + response.status.toLocaleString()
          );
        }
        return (await response.json()) as Client;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Deleted client: " + data.name);
    },
  });
};

export const useUpdateClient = (clientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ clientData }: { clientData: UpdateClientData }) => {
      try {
        const response = await fetch(`/api/clients/${clientId}`, {
          method: "PUT",
          body: JSON.stringify({
            clientData: {
              ...clientData,
            },
          }),
        });

        if (!response.ok) {
          throw Error("Error happend!: " + response.status.toLocaleString());
        }
        return (await response.json()) as Client;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
