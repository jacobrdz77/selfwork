import React, {
  createContext,
  useContext,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import useMenu from "@/hooks/useMenu";

type DropDownContextType = {
  btnRef: MutableRefObject<HTMLButtonElement | null>;
  menuRef: MutableRefObject<HTMLUListElement | null>;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  theme?: "light" | "dark";
};

const DropDownContext = createContext<DropDownContextType | null>(null);

export const useDropDownContext = () => {
  const ctx = useContext(DropDownContext);

  if (!ctx)
    throw new Error("Component must be under <DropDownContext.Provider>");

  return ctx;
};

type DropDownProps = {
  children: any;
  className?: string;
  theme?: "light" | "dark";
};

const DropDown = ({ children, className, theme }: DropDownProps) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  return (
    <DropDownContext.Provider
      value={{
        btnRef,
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        theme,
      }}
    >
      <div
        className={`dropdown ${theme ? theme : ""} ${
          className ? className : ""
        } ${isMenuOpen ? "active" : ""}`}
      >
        {children}
      </div>
    </DropDownContext.Provider>
  );
};

type DropDownButtonProps = {
  children: any;
  className?: string;
};

const DropDownButton = ({ children, className }: DropDownButtonProps) => {
  const { btnRef, isMenuOpen, setIsMenuOpen, theme } = useDropDownContext();
  return (
    <button
      ref={btnRef}
      className={`dropdown__button ${isMenuOpen ? "active" : ""} ${
        theme ? theme : ""
      } ${className ? className : ""}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsMenuOpen((prev) => !prev);
      }}
      role="button"
    >
      {children}
    </button>
  );
};

type DropDownItemProps = {
  children: any;
  className?: string;
  isList?: boolean;
  onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => any;
  disabled?: boolean;
};

const DropDownItem = ({
  children,
  className,
  onClick,
  isList = true,
  disabled,
}: DropDownItemProps) => {
  const { setIsMenuOpen, theme } = useDropDownContext();
  return (
    <li
      className={`${isList ? "dropdown__item" : ""} ${theme ? theme : ""} ${
        className ? className : ""
      }`}
      onClick={(e) => {
        if (disabled) return;
        setIsMenuOpen(false);
        if (onClick) {
          onClick(e);
        }
      }}
      aria-label="Dropdown menu item"
    >
      {children}
    </li>
  );
};

type DropDownMenuProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
  size?: "small";
  position:
    | "bottom-right"
    | "bottom-left"
    | "top-right"
    | "top-left"
    | "bottom"
    | "top"
    | "right"
    | "left";
};

const DropDownMenu = ({
  children,
  className,
  position,
  size,
}: DropDownMenuProps) => {
  const { isMenuOpen, theme, menuRef } = useDropDownContext();
  return (
    <>
      {isMenuOpen && (
        <ul
          ref={menuRef}
          className={`dropdown__menu ${size ? size : ""} ${
            theme ? theme : ""
          } ${position}  ${className ? className : ""}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
          aria-label="Dropdown menu"
        >
          {children}
        </ul>
      )}
    </>
  );
};

DropDown.Button = DropDownButton;
DropDown.Menu = DropDownMenu;
DropDown.Item = DropDownItem;

export default DropDown;
