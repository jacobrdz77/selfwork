import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import React, { ReactNode, useState } from "react";
import { useModalStore } from "store/user";
import AddProjectModal from "../project/AddProjectModal";
import AddTaskPopup from "../task/AddTaskPopup";
import NavBar from "./NavBar";

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
  return (
    <div className="layout">
      <NavBar />
      <main className="main">
        {children}
        {isAddTaskOpen && (
          <AddTaskPopup isOpen={isAddTaskOpen} setIsOpen={setIsAddTaskOpen} />
        )}
        {isAddProjectModalOpen && (
          <AddProjectModal
            isOpen={isAddProjectModalOpen}
            setIsModalOpen={setIsAddProjectModalOpen}
          />
        )}
      </main>
    </div>
  );
};

export default PageLayout;
