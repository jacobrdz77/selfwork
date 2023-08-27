import React from "react";
import Button from "../UI/Button";

const NoTasks: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
