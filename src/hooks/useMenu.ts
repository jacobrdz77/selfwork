import { useState, useRef } from "react";
import useOnClickOutside from "./useOnClickOutside";

const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  useOnClickOutside(
    menuRef,
    () => {
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
