import { NextPage } from "next";
import Button from "../../components/ui/Button";
import Header from "../../components/header/PageHeader";
import Clients from "../../components/client/Clients";
import NoClients from "../../components/client/NoClients";
import LoadingPage from "../../components/ui/LoadingSpinner";
import { useMemo, useState } from "react";
import AddClientModal from "../../components/client/AddClientModal";
import useClients from "../../hooks/useClients";

const ClientsPage: NextPage = () => {
  const { clients, isLoading, status } = useClients();
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
      {status === "success" && clients!.length > 0 ? (
        clients?.map((client) => <p key={client.id}>{client.name}</p>)
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
