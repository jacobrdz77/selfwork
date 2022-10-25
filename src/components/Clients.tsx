import { Client } from "@prisma/client";
import DataTable from "react-data-table-component";
import React from "react";

const columns = [
  {
    name: "Name",
  },
  {
    name: "Phone",
  },
  {
    name: "Email",
  },
  {
    name: "Website",
  },
  {
    name: "Business Address",
  },
];

const Clients: React.FC<{ clients: Client }> = ({ clients }) => {
  return (
    <div className="w-full h-full flex-grow">
      <DataTable columns={columns} data={clients} />
    </div>
  );
};

export default Clients;
