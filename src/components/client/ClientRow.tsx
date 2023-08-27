import { ClientWithProjects } from "@/types/types";
import { useEffect, useState } from "react";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import EditClientModal from "./EditClientModal";

const ClientRow = ({ client }: { client: ClientWithProjects }) => {
  const [status, setStatus] = useState("");
  // const { mutate: deleteClient } = useDeleteClient();

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
      {isOpen && (
        <EditClientModal
          isModalOpen={isOpen}
          client={client}
          setIsModalOpen={(boolean) => setIsOpen(boolean)}
        />
      )}

      <tr
        className="client-row"
        onClick={() => {
          console.log(
            "OPEN CLIENT DETAILS MODAL WITH PROJECTS, NOTES AND EVERYTHING."
          );
        }}
      >
        <td className="client-row__data name">{client.name}</td>
        <td className="client-row__data email">{client.email}</td>
        <td className="client-row__data phone">{client.phone}</td>
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
