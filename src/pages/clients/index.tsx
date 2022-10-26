import { NextPage } from "next";
import Button from "../../components/UI/Button";
import Header from "../../components/UI/Header";
import Clients from "../../components/Clients";
import NoClients from "../../components/NoClients";
import LoadingPage from "../../components/Loading/LoadingSpinner";
import { useMemo, useState } from "react";
import AddClientModal from "../../components/AddClientModal";
import useClients from "../../hooks/useClients";
import { Client } from "@prisma/client";

const ClientsPage: NextPage = () => {
  const { clients, isLoading, status } = useClients();
  console.log("Clients: ", clients);
  // const sortedClients = useMemo(() => {
  //   clients?.sort()
  // }, [clients]);
  const [isModalOpen, setModalIsOpen] = useState(false);
  return (
    <div className="h-full py-5 px-7">
      <Header
        isButton={true}
        buttonText="Add Client"
        title="Clients"
        buttonHandler={() => {
          setModalIsOpen(true);
        }}
      >
        {/* Filter buttons */}
        <Button>Sort By</Button>
      </Header>
      <hr className="mt-4" />
      {/* Loading Spinner */}
      {isLoading && (
        <div className="w-full h-full flex justify-center mt-11">
          <LoadingPage />
        </div>
      )}
      {status === "success" && clients!.length === 0 ? (
        <Clients clients={clients!} />
      ) : (
        <NoClients setIsModalOpen={setModalIsOpen} />
      )}

      {status === "error" && (
        <div className="w-full h-full flex justify-center align-middle">
          <h1 className="text-2xl">Error</h1>
          <p className="text-gray-500">
            Sorry about that. Try to refresh the page.
          </p>
        </div>
      )}

      <AddClientModal isOpen={isModalOpen} setIsModalOpen={setModalIsOpen} />
    </div>
  );
};

export default ClientsPage;
