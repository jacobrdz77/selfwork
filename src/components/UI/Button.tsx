import React from "react";

const Button: React.FC<{
  buttonHandler?: any;
  children?: any;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}> = ({ buttonHandler, children, className, type, disabled }) => {
  return (
    <button
      className={`button ${className ? className : ""}`}
      onClick={buttonHandler}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
