import React from "react";

const Button: React.FC<{
  buttonHandler?: any;
  children?: string | React.ReactNode | React.ReactNode[];
  className?: string;
}> = ({ buttonHandler, children, className }) => {
  return (
    <button
      className={"button " + className}
      type="button"
      onClick={buttonHandler}
    >
      {children}
    </button>
  );
};

export default Button;
