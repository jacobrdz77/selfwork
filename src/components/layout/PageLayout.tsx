import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import React, { ReactNode, useState } from "react";
import AddTaskPopup from "../task/AddTaskPopup";
import NavBar from "./NavBar";

const PageLayout: React.FC<{
  children: ReactNode | ReactNode[];
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="layout">
      <NavBar />
      <main className="main">
        {children}
        <AddTaskPopup isOpen={isOpen} setIsOpen={setIsOpen} />
      </main>
    </div>
  );
};

export default PageLayout;
