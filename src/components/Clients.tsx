import { Client } from "@prisma/client";
import { useReactTable } from "@tanstack/react-table";
import React from "react";

const Clients: React.FC<{ clients: Client }> = ({ clients }) => {
  return <div className="w-full h-full flex-grow"></div>;
};

export default Clients;
