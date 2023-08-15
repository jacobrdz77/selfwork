import React from "react";
import EditTaskDetails from "./EditTaskDetails";
import Modal from "../UI/Modal";
import { TaskWithAssignee } from "@/types/types";
import { useModalStore } from "store/user";
import { useOneTask } from "@/hooks/TaskHooks";

const EditTaskModal = ({
  taskId,
  isOpen,
  setIsOpen,
}: {
  taskId: string;
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => any;
}) => {
  return (
    <>
      <Modal
        className="edit-task-modal"
        closeBtn={false}
        isOpen={isOpen}
        closeHandler={() => {
          setIsOpen(false);
        }}
      >
        <EditTaskDetails taskId={taskId!} setIsModalOpen={setIsOpen} />
      </Modal>
    </>
  );
};

export default EditTaskModal;
