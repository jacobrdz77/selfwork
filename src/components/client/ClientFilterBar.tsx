import { ClientStatus } from "@/types/types";
import React, { useState } from "react";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import { useModalStore } from "store/user";
import { Status } from "@prisma/client";

const ClientFilterBar = ({
  name,
  setName,
  clientStatus,
  setClientStatus,
}: {
  name: string;
  setName: (name: string) => void;
  clientStatus: string;
  setClientStatus: (string: string) => void;
}) => {
  const isClientModalOpen = useModalStore((state) => state.isClientModalOpen);
  const setIsClientModalOpen = useModalStore(
    (state) => state.setIsClientModalOpen
  );

  return (
    <div className="filter-bar">
      <ul className="clients__status">
        <li
          onClick={() => {
            setClientStatus("all");
          }}
          className={`status ${clientStatus === "all" ? "active" : ""}`}
        >
          <span>All</span>{" "}
        </li>
        <li
          onClick={() => {
            setClientStatus("active");
          }}
          className={`status ${clientStatus === "active" ? "active" : ""}`}
        >
          <span>Active</span>
        </li>
        <li
          onClick={() => {
            setClientStatus("pending");
          }}
          className={`status ${clientStatus === "pending" ? "active" : ""}`}
        >
          <span>Pending</span>
        </li>
        <li
          onClick={() => {
            setClientStatus("closed");
          }}
          className={`status ${clientStatus === "closed" ? "active" : ""}`}
        >
          <span>Closed</span>
        </li>
      </ul>
      <div className="inputs">
        <div className="search">
          {/* Search LOGO */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon"
          >
            <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>

          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="input"
            type="text"
            placeholder="Search for clients, businesses"
          />
        </div>
        <button
          onClick={() => {
            setIsClientModalOpen(!isClientModalOpen);
          }}
          className="button add-btn"
          role="button"
        >
          <span>Add client</span>
        </button>
      </div>
    </div>
  );
};

export const LoadingClientFilterBar = () => {
  return (
    <div className="filter-bar filter-bar--loading">
      <ul className="clients__status">
        <li>
          <LoadingSkeleton />
        </li>
        <li>
          <LoadingSkeleton />
        </li>
        <li>
          <LoadingSkeleton />
        </li>
      </ul>
      <div className="inputs">
        {/* <LoadingSkeleton /> */}
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    </div>
  );
};

export default ClientFilterBar;
