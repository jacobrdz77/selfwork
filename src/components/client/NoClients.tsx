import React from "react";

const NoClients: React.FC<{
  setIsModalOpen: (isOpen: boolean) => any;
}> = ({ setIsModalOpen }) => {
  return (
    <div className="no-clients">
      <div>
        <h1>No clients</h1>
        <p>There are no clients. Create one!</p>
      </div>
      <button className="no-data__button" onClick={() => setIsModalOpen(true)}>
        Add Client
      </button>
    </div>
  );
};

export default NoClients;
