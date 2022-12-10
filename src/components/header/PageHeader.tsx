import React from "react";

type HeaderProps = {
  title: string;
  subTitle?: string;
  buttonHandler?: () => void;
  buttonText?: string;
  children?: JSX.Element | JSX.Element[];
  isButton?: boolean;
};

const PageHeader: React.FC<HeaderProps> = ({
  title,
  subTitle,
  buttonHandler,
  buttonText,
  children,
  isButton,
}) => {
  return (
    <header className="header">
      <h1 className="header__title">
        {title}
        {subTitle ? " : " : ""}
        <p className="text-2xl text-gray-700">{subTitle}</p>
      </h1>
      <div className="header__buttons-container">
        <div className="header__buttons">
          {isButton && (
            <button
              className="button button--blue"
              type="button"
              onClick={buttonHandler}
            >
              {buttonText}
            </button>
          )}

          {children}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
