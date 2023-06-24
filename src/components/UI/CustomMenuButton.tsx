import useMenu from "@/hooks/useMenu";
import React from "react";

const MenuButton = ({
  children,
  menuContent,
  className,
  listItems,
  setItem,
}: {
  children: any;
  menuContent: any;
  listItems?: any[];
  className?: string;
  setItem?: (item: any) => void;
}) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  return (
    <div className={"menu-button menu-button-container " + className}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsMenuOpen((state) => !state);
        }}
        ref={btnRef}
        className="menu-button"
      >
        {children}
      </button>

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="menu"
          ref={menuRef}
        >
          {menuContent}
        </div>
      )}
    </div>
  );
};

export default MenuButton;
