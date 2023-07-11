import React from "react";
import EditTaskDetails from "./EditTaskDetails";
import Modal from "../UI/Modal";
import { TaskWithAssignee } from "@/types/types";
import { useModalStore } from "store/user";
import { useOneTask } from "@/hooks/TaskHooks";

const EditTaskModal = ({ taskId }: { taskId: string }) => {
  const isTaskDetailOpen = useModalStore((state) => state.isTaskDetailOpen);
  const setIsTaskDetailOpen = useModalStore(
    (state) => state.setIsTaskDetailOpen
  );
  const { task, status } = useOneTask(taskId);
  console.log("Getting task...");
  console.log("status: ", status);

  return (
    <>
      {isTaskDetailOpen && (
        <Modal
          className="edit-task-modal"
          closeBtn={false}
          isOpen={isTaskDetailOpen}
          closeHandler={() => {
            setIsTaskDetailOpen(false);
          }}
        >
          {status === "loading" && <div>Loading....</div>}
          {status === "success" && (
            <EditTaskDetails
              task={task!}
              setIsModalOpen={setIsTaskDetailOpen}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default EditTaskModal;
