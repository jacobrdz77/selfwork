import { Client } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ClientRow, { ClientRowLoading } from "./ClientRow";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import ClientFilterBar from "./ClientFilterBar";
import { ClientWithProjects } from "@/types/types";
import { useModalStore } from "store/user";

const ClientsTable = ({ clients }: { clients: ClientWithProjects[] }) => {
  const [sortedClients, setSortedClients] = useState(clients);
  const [searchName, setSearchName] = useState("");
  const [clientStatus, setClientStatus] = useState("all");

  useEffect(() => {
    if (clientStatus === "all") {
      setSortedClients(() =>
        clients.filter((client) => {
          return client.name
            .toLocaleLowerCase()
            .includes(searchName.trim().toLocaleLowerCase());
        })
      );
    } else if (clientStatus === "active") {
      setSortedClients(() =>
        clients.filter(
          (client) =>
            client.status === "Active" &&
            client.name
              .toLocaleLowerCase()
              .includes(searchName.trim().toLocaleLowerCase())
        )
      );
    } else if (clientStatus === "pending") {
      setSortedClients(() =>
        clients.filter(
          (client) =>
            client.status === "Pending" &&
            client.name
              .toLocaleLowerCase()
              .includes(searchName.trim().toLocaleLowerCase())
        )
      );
    } else if (clientStatus === "closed") {
      setSortedClients(() =>
        clients.filter(
          (client) =>
            client.status === "Closed" &&
            client.name
              .toLocaleLowerCase()
              .includes(searchName.trim().toLocaleLowerCase())
        )
      );
    }
  }, [searchName, clientStatus, clients]);

  return (
    <>
      <ClientFilterBar
        name={searchName}
        setName={setSearchName}
        clientStatus={clientStatus}
        setClientStatus={setClientStatus}
      />

      <div className="clients-table-container">
        <table className="clients-table">
          <thead className="table-header">
            <tr>
              <th scope="col" className="table-head">
                <div className="flex">
                  Client
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="table-head">
                <div className="flex">
                  Company Name
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="table-head">
                <div className="flex">
                  Email
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="table-head">
                <div className="flex ">
                  Value
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                    </svg>
                  </a>
                </div>
              </th>

              <th scope="col" className="table-head">
                <div className="flex ">
                  Status
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 ml-1"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="table-head">
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedClients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      </div>

      {sortedClients.length === 0 && <NoClients />}
    </>
  );
};

export default ClientsTable;

const NoClients = () => {
  const setIsClientModalOpen = useModalStore(
    (state) => state.setIsClientModalOpen
  );
  return (
    <div className="clients-table__no-clients">
      <div>
        <h3>No Clients Found</h3>
      </div>
      <button
        className="button no-data__button"
        onClick={() => {
          setIsClientModalOpen(true);
        }}
      >
        Add Client
      </button>
    </div>
  );
};
