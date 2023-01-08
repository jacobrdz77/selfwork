import React from "react";
import NavBar from "./NavBar";

const PageLayout: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  return (
    <div className="layout">
      <NavBar />
      <main className="main">{children}</main>
    </div>
  );
};

export default PageLayout;
