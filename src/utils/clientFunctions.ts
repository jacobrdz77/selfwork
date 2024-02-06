import {
  ClientWithProjects,
  NewClientData,
  UpdateClientData,
} from "@/types/types";
import { Client } from "@prisma/client";
import { axios } from "libs/axios";

// create a new client
export const createClient = async (client: NewClientData, userId: string) => {
  try {
    console.log("INPUT: ", client, userId);
    const response = await axios.post("/clients", { ...client, userId });
    return response.data as Client;
  } catch (error) {
    console.log(error);
  }
};

// Get all clients
export const getClients = async (userId: string) => {
  const response = await axios.get("/clients", {
    data: {
      userId,
    },
  });

  return response.data as ClientWithProjects[];
};

// Get one client
export const getOneClient = async (clientId: string) => {
  const response = await axios.get(`/clients/${clientId}`);
  return response.data as Client;
};

// Update a client
export const updateClient = async (
  clientId: string,
  clientData: UpdateClientData
) => {
  try {
    const response = await axios.put(`/clients/${clientId}`, { clientData });
    return response.data as Client;
  } catch (error) {
    console.log(error);
  }
};

// Delete Client
export const deleteClient = async (clientId: string) => {
  try {
    const response = await axios.delete(`/clients/${clientId}`);
    return response.data as Client;
  } catch (error) {
    console.log(error);
  }
};
