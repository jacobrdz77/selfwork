import { Client } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

interface clientInfo {
  clientId: string;
  name: string;
}

export const useProjectForm = (userId: string) => {
  const [name, setName] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [clients, setClients] = useState<clientInfo[] | null>(null);
  const [description, setDescription] = useState<string | null>("");

  useEffect(() => {
    const getClients = async () => {
      const clients = await fetch("/api/clients", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          //@ts-ignore
          userId,
        },
      })
        .then((res) => res.json())
        .then((res) => res.data);
      setClients(clients);
    };
    getClients();
  }, [userId]);

  return {
    name,
    setName,
    selectedClient,
    setSelectedClient,
    clients,
    description,
    setDescription,
  };
};
