import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import React, { ReactNode, useState } from "react";
import { useModalStore } from "store/user";
import AddProjectModal from "../project/AddProjectModal";
import AddTaskPopup from "../task/AddTaskPopup";
import NavBar from "./NavBar";
import { Toaster } from "react-hot-toast";
import EditTaskModal from "../task/EditTaskModal";

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
      {/* <EditTaskModal
        isOpen={isTaskDetailOpen!}
        setIsModalOpen={setIsTaskDetailOpen}
      /> */}
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
