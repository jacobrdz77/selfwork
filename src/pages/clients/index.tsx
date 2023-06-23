import { NextPage } from "next";
import Button from "@/components/UI/Button";
import PageHeader from "@/components/header/PageHeader";
import Clients from "@/components/client/Clients";
import NoClients from "@/components/client/NoClients";
import LoadingPage from "@/components/UI/LoadingSpinner";
import { useState } from "react";
import { useClients } from "@/hooks/ClientHooks";
import ClientStatsCards from "@/components/client/ClientStatsCards";
import ClientFilterBar, {
  LoadingClientFilterBar,
} from "@/components/client/ClientFilterBar";
import ClientsTable from "@/components/client/ClientsTable";
import LoadingSkeleton from "@/components/UI/LoadingSkeleton";

const ClientsPage: NextPage = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const { clients, isLoading, status } = useClients();

  return (
    <>
      <PageHeader title="Clients" />
      <div className="page clients-page">
        {status === "loading" && (
          <>
            <LoadingClientStatsCards />
            <LoadingClientTable />
          </>
        )}

        {status === "success" && (
          <>
            <ClientStatsCards clients={clients!} />
            <ClientsTable clients={clients!} />
          </>
        )}
      </div>
    </>
  );
};

export default ClientsPage;

const LoadingClientStatsCards = () => {
  return (
    <div className="client-stats client-stats--loading">
      <LoadingSkeleton />
      <LoadingSkeleton />
      <LoadingSkeleton />
    </div>
  );
};
const LoadingClientTable = () => {
  return (
    <div className="clients-table--loading">
      <LoadingClientFilterBar />
      <div>
        <LoadingSkeleton className="row-loading" />
      </div>
      <div>
        <LoadingSkeleton className="row-loading" />
      </div>
      <div>
        <LoadingSkeleton className="row-loading" />
      </div>
      <div>
        <LoadingSkeleton className="row-loading" />
      </div>
    </div>
  );
};
