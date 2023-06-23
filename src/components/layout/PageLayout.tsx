import React, { ReactNode, useState } from "react";
import { useModalStore } from "store/user";
import AddProjectModal from "../project/AddProjectModal";
import AddTaskPopup from "../task/AddTaskPopup";
import NavBar from "./NavBar";
import { Toaster } from "react-hot-toast";
import EditTaskModal from "../task/EditTaskModal";
import AddClientModal from "../client/AddClientModal";

const PageLayout: React.FC<{
  children: ReactNode | ReactNode[];
}> = ({ children }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const isAddTaskOpen = useModalStore((state) => state.isAddTaskOpen);
  const setIsAddTaskOpen = useModalStore((state) => state.setIsAddTaskOpen);
  const isAddProjectModalOpen = useModalStore(
    (state) => state.isAddProjectModalOpen
  );
  const setIsAddProjectModalOpen = useModalStore(
    (state) => state.setIsAddProjectModalOpen
  );
  const isTaskDetailOpen = true;
  const setIsTaskDetailOpen = useModalStore(
    (state) => state.setIsTaskDetailOpen
  );

  const isClientModalOpen = useModalStore((state) => state.isClientModalOpen);
  const setIsClientModalOpen = useModalStore(
    (state) => state.setIsClientModalOpen
  );

  console.log("client modal: ", isClientModalOpen);

  return (
    <div className="layout">
      <NavBar />
      <main className="main">{children}</main>
      {isAddTaskOpen && (
        <AddTaskPopup isOpen={isAddTaskOpen} setIsOpen={setIsAddTaskOpen} />
      )}
      {isAddProjectModalOpen && (
        <AddProjectModal
          isOpen={isAddProjectModalOpen}
          setIsModalOpen={setIsAddProjectModalOpen}
        />
      )}
      {isClientModalOpen && (
        <AddClientModal
          isOpen={isClientModalOpen}
          setIsModalOpen={setIsClientModalOpen}
        />
      )}

      {/* <AddClientModal
        isOpen={isClientModalOpen}
        setIsModalOpen={setIsClientModalOpen}
      /> */}
      {/* {isTaskDetailOpen && (
        <EditTaskModal
        taskId={taskId}
          isOpen={isTaskDetailOpen!}
          setIsModalOpen={setIsTaskDetailOpen}
        />
      )} */}

      <Toaster
        position="bottom-left"
        toastOptions={{
          className: "toast",
          duration: 4000,
          style: {
            color: "#fff",
            fontSize: "1.4rem",
          },
        }}
      />
    </div>
  );
};

export default PageLayout;
