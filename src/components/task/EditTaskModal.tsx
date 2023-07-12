import React from "react";
import EditTaskDetails from "./EditTaskDetails";
import Modal from "../UI/Modal";
import { TaskWithAssignee } from "@/types/types";
import { useModalStore } from "store/user";
import { useOneTask } from "@/hooks/TaskHooks";

const EditTaskModal = ({
  task,
  isOpen,
  setIsOpen,
}: {
  task: TaskWithAssignee;
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => any;
}) => {
  // const isTaskDetailOpen = useModalStore((state) => state.isTaskDetailOpen);
  // const setIsTaskDetailOpen = useModalStore(
  //   (state) => state.setIsTaskDetailOpen
  // );

  console.log("Task: ", task.name);

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
        <EditTaskDetails task={task!} setIsModalOpen={setIsOpen} />
      </Modal>
    </>
  );
};

export default EditTaskModal;
