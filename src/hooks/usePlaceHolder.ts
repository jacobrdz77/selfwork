import { useState, useEffect, useRef, useCallback } from "react";

const usePlaceHolder = ({ blurHandler }: { blurHandler: () => void }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);
  const focusOnInput = useCallback(() => {
    // @ts-ignore
    if (inputRef.current) {
      inputRef.current!.focus();
    }
  }, []);
  const handleInputBlur = (e: any) => {
    if (blurHandler) {
      blurHandler();
    }
    // Switches to display button
    setIsInputFocused(false);
  };

  useEffect(() => {
    if (inputRef) {
      focusOnInput();
    }
  }, [focusOnInput]);

  useEffect(() => {
    if (isInputFocused === true) {
      focusOnInput();
    }
  }, [isInputFocused, focusOnInput]);

  return {
    isInputFocused,
    setIsInputFocused,
    inputRef,
    handleInputBlur,
  };
};

export default usePlaceHolder;
