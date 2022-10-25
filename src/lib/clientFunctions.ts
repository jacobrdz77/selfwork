import axios from "axios";

type newClient = {
  name: string;
  email: string;
  phone: string;
  businessAddress: string;
  website: string;
  user: {
    connect: {
      id: string;
    };
  };
};

// create a new client
export const createClient = async (client: newClient) => {
  const newClient = await axios.post("/api/clients", { client });
  return newClient.data;
};

// Get all clients
export const getClients = async (userId: string) => {
  const allClients = await axios.get("/api/clients", {
    data: {
      userId,
    },
  });
  return allClients.data;
};

// Get one client
export const getOneClient = async (clientId: string) => {
  const client = await axios.get(`/api/clients/${clientId}`);
  return client.data;
};

// Update a client
export const updateClient = async (
  clientId: string,
  newClientData: newClient
) => {
  const updatedClient = await axios.put(`/api/clients/${clientId}`, {
    data: {
      newClientData,
    },
  });
  return updatedClient.data;
};

// Delete Client
export const deleteClient = async (clientId: string) => {
  const deletedClient = await axios.delete(`/api/clients/${clientId}`);
  return deletedClient.data;
};
