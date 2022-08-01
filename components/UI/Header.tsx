import React from "react";

type HeaderProps = {
  title: string;
  buttonHandler: () => void;
  children?: JSX.Element;
};

const Header: React.FC<HeaderProps> = ({ title, buttonHandler, children }) => {
  return (
    <header className="flex justify-between">
      <h1 className="text-3xl">{title}</h1>
      <div className="flex">
        <button
          className="bg-button text-white text-[14px] py-2 px-2 rounded-[5px] hover:bg-buttonHover"
          type="button"
          onClick={buttonHandler}
        >
          + Add Project
        </button>
        {children}
      </div>
    </header>
  );
};

export default Header;
