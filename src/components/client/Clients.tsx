import { Client } from "@prisma/client";
import React from "react";

const Clients: React.FC<{ clients: Client[] }> = ({ clients }) => {
  return <div className="clients"></div>;
};

export default Clients;
