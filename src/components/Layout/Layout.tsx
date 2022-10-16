import React, { ReactPropTypes } from "react";
import NavBar from "./NavBar";

type LayoutProps = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-row">
      <NavBar />
      <main className="grow">{children}</main>
    </div>
  );
};

export default Layout;
