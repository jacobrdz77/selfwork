import React, { ReactPropTypes } from "react";
import NavBar from "./NavBar";

type LayoutProps = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <NavBar />
      <main className="grow">{children}</main>
    </div>
  );
};

export default Layout;
