import React from "react";
import Button from "../ui/Button";

const NoTasks: React.FC<{
  setIsModalOpen: (isOpen: boolean) => any;
}> = ({ setIsModalOpen }) => {
  return (
    <div className="no-data">
      <div>
        <h1>No tasks</h1>
        <p>There are no tasks. Create one!</p>
      </div>
      <Button
        className="button--blue no-data__button"
        buttonHandler={() => setIsModalOpen(true)}
      >
        Add Task
      </Button>
    </div>
  );
};

export default NoTasks;
