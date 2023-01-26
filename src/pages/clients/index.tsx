import { NextPage } from "next";
import Button from "@/components/UI/Button";
import PageHeader from "@/components/header/PageHeader";
import Clients from "@/components/client/Clients";
import NoClients from "@/components/client/NoClients";
import LoadingPage from "@/components/UI/LoadingSpinner";
import { useMemo, useState } from "react";
import AddClientModal from "@/components/client/AddClientModal";
import useClients from "@/hooks/useClients";

const ClientsPage: NextPage = () => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const { clients, isLoading, status } = useClients();

  return (
    <>
      <PageHeader
        isButton={true}
        buttonText="Add Client"
        title="Clients"
        buttonHandler={() => {
          setModalIsOpen(true);
        }}
      />
      <div className="page clients-page">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="w-full h-full flex justify-center mt-11">
            <LoadingPage />
          </div>
        )}
        {status === "success" && clients!.length > 0 ? (
          clients?.map((client) => <p key={client.id}>{client.name}</p>)
        ) : (
          <NoClients setIsModalOpen={setModalIsOpen} />
        )}

        {status === "error" && (
          <div className="w-full h-full flex justify-center align-middle">
            <h2 className="text-2xl">Error</h2>
            <p className="text-gray-500">
              Sorry about that. Try to refresh the page.
            </p>
          </div>
        )}

        {/* <AddClientModal isOpen={isModalOpen} setIsModalOpen={setModalIsOpen} /> */}
      </div>
    </>
  );
};

export default ClientsPage;
