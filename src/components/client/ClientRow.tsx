import { Client } from "@prisma/client";
import React, { useState, useEffect } from "react";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import { ClientWithProjects } from "@/types/types";
import MenuWithButton from "../UI/MenuButton";
import { useDeleteClient } from "@/hooks/ClientHooks";
import ClientDetailModal from "./ClientDetailModal";

const ClientRow = ({ client }: { client: ClientWithProjects }) => {
  const [status, setStatus] = useState("");
  const { mutate: deleteClient } = useDeleteClient();

  useEffect(() => {
    switch (client.status) {
      case "Active":
        setStatus("active");
        break;
      case "Pending":
        setStatus("pending");
        break;
      case "Closed":
        setStatus("closed");
        break;
    }
  }, [client]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ClientDetailModal
        isModalOpen={isOpen}
        client={client}
        setIsModalOpen={(boolean) => setIsOpen(boolean)}
      />
      <tr
        className="client-row"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <td className="client-row__data name">{client.name}</td>
        <td className="client-row__data email">{client.email}</td>
        <td className="client-row__data email">{client.phone}</td>
        <td className="client-row__data premium">
          ${Number(client.totalLumpSum)}
        </td>
        <td className={"client-row__data status" + ` status--${status}`}>
          {client.status}
        </td>
        <td className="client-row__data action">
          <button
            className="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            View
          </button>
          <MenuWithButton
            menuContent={
              <ul>
                <li
                  onClick={(e) => {
                    deleteClient(client.id);
                  }}
                >
                  Delete
                </li>
              </ul>
            }
          >
            <div className="more-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </div>
          </MenuWithButton>
        </td>
      </tr>
    </>
  );
};

export default ClientRow;

export const ClientRowLoading = () => {
  return (
    <tr className="client-row">
      <LoadingSkeleton />
    </tr>
  );
};
