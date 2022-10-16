import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../lib/clientFunctions";
import { useSession } from "next-auth/react";
import Button from "../../components/UI/Button";
import Header from "../../components/UI/Header";
import Clients from "../../components/Clients";
import NoClients from "../../components/NoClients";
import LoadingPage from "../../components/Loading/LoadingProjectPage";

const ClientsPage: NextPage = () => {
  const userId = useSession().data?.user?.id as string;
  const {
    data: clients,
    isLoading,
    status,
  } = useQuery(["clients"], () => getClients(userId));
  console.log("Clients: ", clients);
  return (
    <div className="h-full py-5 px-7">
      <Header isButton={true} buttonText="Add Client" title="Clients">
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
        <NoClients />
      ) : (
        <Clients clients={clients} />
      )}
    </div>
  );
};

export default ClientsPage;
