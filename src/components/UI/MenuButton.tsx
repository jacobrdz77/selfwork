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
  menuContent?: any;
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
          e.stopPropagation();
          setIsMenuOpen((state) => !state);
        }}
        ref={btnRef}
        className="menu-button"
      >
        {children}
      </button>

      {isMenuOpen && (
        <div className={`menu ${isMenuOpen ? "active" : ""}`} ref={menuRef}>
          {!menuContent &&
            listItems?.map((item) => (
              <div
                key={item}
                className="item"
                onClick={() => {
                  setIsMenuOpen(false);
                  setItem!(item.id!);
                }}
              >
                {item.name}
              </div>
            ))}

          {menuContent && menuContent}
        </div>
      )}
    </div>
  );
};

export default MenuButton;
