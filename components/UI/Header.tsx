import React from "react";

type HeaderProps = {
  title: string;
  buttonHandler?: () => void;
  buttonText?: string;
  children?: JSX.Element | JSX.Element[];
  isButton?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  title,
  buttonHandler,
  buttonText,
  children,
  isButton,
}) => {
  return (
    <header className="flex justify-between">
      <h1 className="text-3xl">{title}</h1>
      <div className="flex gap-2">
        {isButton && (
          <button
            className="bg-button text-white text-[14px] px-3 tracking-wide py-1 rounded-[7px] hover:bg-buttonHover"
            type="button"
            onClick={buttonHandler}
          >
            {buttonText}
          </button>
        )}

        {children}
      </div>
    </header>
  );
};

export default Header;
