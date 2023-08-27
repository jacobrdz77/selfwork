import { useCallback, useEffect, useRef, useState } from "react";

const usePlaceHolder = ({ blurHandler }: { blurHandler: () => void }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);
  const focusOnInput = useCallback(() => {
    // @ts-ignore
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current!.focus();
    }
  }, []);
  const handleInputBlur = () => {
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
