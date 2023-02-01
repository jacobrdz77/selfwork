import { useEffect, RefObject } from "react";

type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  buttonRef?: RefObject<T>
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      const btn = buttonRef?.current;
      if (
        !el ||
        el.contains((event?.target as Node) || null) ||
        btn?.contains(event.target as Node)
      ) {
        return;
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, buttonRef]); // Reload only if ref or handler changes
};

// Used hook from https://usehooks-ts.com/react-hook/use-on-click-outside

export default useOnClickOutside;
