import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import React, { ReactNode, useState } from "react";
import { useModalStore } from "store/user";
import AddTaskPopup from "../task/AddTaskPopup";
import NavBar from "./NavBar";

const PageLayout: React.FC<{
  children: ReactNode | ReactNode[];
}> = ({ children }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const isAddTaskOpen = useModalStore((state) => state.isAddTaskOpen);
  const setIsAddTaskOpen = useModalStore((state) => state.setIsAddTaskOpen);
  return (
    <div className="layout">
      <NavBar />
      <main className="main">
        {children}
        {isAddTaskOpen && (
          <AddTaskPopup isOpen={isAddTaskOpen} setIsOpen={setIsAddTaskOpen} />
        )}
      </main>
    </div>
  );
};

export default PageLayout;
