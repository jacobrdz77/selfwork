import { TaskWithAssignee } from "@/types/types";
import Modal from "../UI/Modal";
import EditTaskDetails from "./EditTaskDetails";

const EditTaskModal = ({
  task,
  isOpen,
  setIsOpen,
}: {
  task: TaskWithAssignee;
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
        <EditTaskDetails task={task!} setIsModalOpen={setIsOpen} />
      </Modal>
    </>
  );
};

export default EditTaskModal;
