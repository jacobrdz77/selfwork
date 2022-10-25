import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../lib/clientFunctions";
import { useSession } from "next-auth/react";
import Button from "../../components/UI/Button";
import Header from "../../components/UI/Header";
import Clients from "../../components/Clients";
import NoClients from "../../components/NoClients";
import LoadingPage from "../../components/Loading/LoadingProjectPage";
import { useAtomValue } from "jotai";
import { userIdAtom } from "../../store/user";
import { useState } from "react";
import AddClientModal from "../../components/AddClientModal";

const ClientsPage: NextPage = () => {
  const userId = useAtomValue(userIdAtom);
  const {
    data: clients,
    isLoading,
    status,
  } = useQuery(["clients"], () => getClients(userId));
  const [isModalOpen, setModalIsOpen] = useState(true);
  return (
    <div className="h-full py-5 px-7">
      <Header
        isButton={true}
        buttonText="Add Client"
        title="Clients"
        buttonHandler={() => {
          setModalIsOpen(!false);
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
      {status === "success" && clients.length === 0 ? (
        <Clients clients={clients} />
      ) : (
        <NoClients />
      )}

      <AddClientModal
        isOpen={isModalOpen}
        clients={clients}
        setIsModalOpen={setModalIsOpen}
      />
    </div>
  );
};

export default ClientsPage;
