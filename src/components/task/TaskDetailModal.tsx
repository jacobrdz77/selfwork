import React from "react";
import Modal from "../UI/Modal";

const TaskDetailModal: React.FC<{
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsModalOpen }) => {
  return (
    <Modal
      closeBtn={false}
      isOpen={isOpen}
      closeHandler={() => setIsModalOpen(isOpen)}
    >
      <h1>Create a Project</h1>
    </Modal>
  );
};

export default TaskDetailModal;
