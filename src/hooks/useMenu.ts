import { useState, useRef } from "react";
import useOnClickOutside from "./useOnClickOutside";

const useMenu = (closeHandler?: () => void) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  useOnClickOutside(
    menuRef,
    () => {
      if (closeHandler) {
        closeHandler();
      }
      setIsMenuOpen(false);
    },
    btnRef
  );

  return {
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    btnRef,
  };
};

export default useMenu;
