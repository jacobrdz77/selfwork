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
  isDark: boolean;
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
  isDark?: boolean;
};

const DropDown = ({ children, className, isDark = false }: DropDownProps) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  return (
    <DropDownContext.Provider
      value={{
        btnRef,
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        isDark,
      }}
    >
      <div
        className={`dropdown ${isDark ? "dark" : ""} ${
          className ? className : ""
        }`}
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
  const { btnRef, isMenuOpen, setIsMenuOpen, isDark } = useDropDownContext();
  return (
    <button
      ref={btnRef}
      className={`dropdown__button ${isMenuOpen ? "active" : ""} ${
        isDark ? "dark" : ""
      } ${className ? className : ""}`}
      onClick={(e) => {
        e.preventDefault();
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
  onClick?: () => any;
};

const DropDownItem = ({
  children,
  className,
  onClick,
  isList = true,
}: DropDownItemProps) => {
  const { setIsMenuOpen, isDark } = useDropDownContext();
  return (
    <li
      className={`${isList ? "dropdown__item" : ""} ${isDark ? "dark" : ""} ${
        className ? className : ""
      }`}
      onClick={() => {
        setIsMenuOpen(false);
        if (onClick) {
          onClick();
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

const DropDownMenu = ({ children, className, position }: DropDownMenuProps) => {
  const { isMenuOpen, isDark, menuRef } = useDropDownContext();
  return (
    <>
      {isMenuOpen && (
        <ul
          ref={menuRef}
          className={`dropdown__menu ${isDark ? "dark" : ""} ${
            className ? className : ""
          } ${position}`}
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
