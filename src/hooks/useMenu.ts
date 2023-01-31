import { useOnClickOutside } from "./useOnClickOutside";
import { useState, useRef } from "react";

export const useMenu = () => {
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
