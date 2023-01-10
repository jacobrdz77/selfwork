import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import React, { ReactNode } from "react";
import NavBar from "./NavBar";

const PageLayout: React.FC<{
  children: ReactNode | ReactNode[];
}> = ({ children }) => {
  return (
    <div className="layout">
      <NavBar />
      <main className="main">{children}</main>
    </div>
  );
};

export default PageLayout;
