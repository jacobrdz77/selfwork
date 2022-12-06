import React from "react";

const SmallButton = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <a className="max-w-[28px] max-h-[28px] bg-gray-600 hover:bg-gray-400 transition-colors duration-150 align-middle">
      {children}
    </a>
  );
};

export default SmallButton;
