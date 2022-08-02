import React, { useState, useEffect } from "react";

export const useProjectForm = (userId: string) => {
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getClients = async () => {
      const client = await fetch("/api/clients", {
        method: "GET",
        body: JSON.stringify({ userId }),
      })
        .then((res) => res.json())
        .then((data) => data.data);
      setClient(client);
    };
    getClients();
  }, [userId]);

  return {
    name,
    client,
    description,
  };
};
