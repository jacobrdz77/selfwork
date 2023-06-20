import React from "react";
import EditTaskDetails from "./EditTaskDetails";
import Modal from "../UI/Modal";
import { TaskWithAssignee } from "@/types/types";

const EditTaskModal = ({
  taskId,
  isOpen,
  setIsModalOpen,
}: {
  taskId: string;
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      closeHandler={() => {
        setIsModalOpen(false);
      }}
    >
      <EditTaskDetails taskId={taskId} setIsModalOpen={setIsModalOpen} />
    </Modal>
  );
};

export default EditTaskModal;
