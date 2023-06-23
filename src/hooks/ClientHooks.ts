import { useUserStore } from "../store/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  NewClientData,
  NewProjectFormData,
  ProjectsWithSections,
  UpdateProjectData,
} from "../types/types";
import {
  createProject,
  getOneProject,
  getProjects,
  updateProject,
} from "../utils/projectFunctions";
import { Client } from "@prisma/client";
import { getClients } from "@/utils/clientFunctions";
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

  return useMutation({
    mutationFn: async (clientData: NewClientData) => {
      try {
        const response = await fetch(`/api/clients`, {
          method: "POST",
          body: JSON.stringify({
            client: clientData,
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

      toast.success("Deleted client: " + data);
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
      toast.success("Deleted client: " + data);
    },
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      clientId,
      clientData,
    }: {
      clientId: string;
      clientData: UpdateProjectData;
    }) => {
      try {
        const response = await fetch(`/api/clients/${clientId}`, {
          method: "PUT",
          body: JSON.stringify({
            clientData: clientData,
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
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["client", data.id] });
    },
  });
};
