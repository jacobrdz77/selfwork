import React from "react";
import Button from "../UI/Button";

const NoClients: React.FC<{
  setIsModalOpen: (isOpen: boolean) => any;
}> = ({ setIsModalOpen }) => {
  return (
    <div className="no-data">
      <div>
        <h1>No clients</h1>
        <p>There are no clients. Create one!</p>
      </div>
      <Button
        className="button--blue no-data__button"
        buttonHandler={() => setIsModalOpen(true)}
      >
        Add Client
      </Button>
    </div>
  );
};

export default NoClients;
