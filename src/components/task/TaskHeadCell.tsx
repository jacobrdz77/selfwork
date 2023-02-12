import { useState, useRef, useEffect } from "react";

const TaskHeadCell = ({
  children,
  width,
  minWidth,
  maxWidth,
}: {
  children: string;
  width: number;
  minWidth: number;
  maxWidth: number;
}) => {
  const { resizerRef, headerRef, isResizing, handleMouseDown } = useResizing({
    minWidth,
    maxWidth,
  });

  return (
    <div className="th" style={{ width }} ref={headerRef}>
      <div className="th-content">{children}</div>
      <div
        ref={resizerRef}
        className={`resizer ${isResizing ? "resizer--isResizing" : ""}`}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default TaskHeadCell;

const useResizing = ({
  minWidth,
  maxWidth,
}: {
  minWidth: number;
  maxWidth: number;
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const position = useRef({ x: 0 });
  const resizerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  useEffect(() => {
    if (!isResizing) {
      return;
    }

    let headerWidth = parseInt(headerRef.current!.style.width, 10);
    console.log("Initial Width: ", headerWidth);

    const handleMouseMove = (event: MouseEvent) => {
      if (!resizerRef.current || !position.current) {
        return;
      }

      const pos = position.current;
      const element = resizerRef.current;

      let newWidth = headerWidth + position.current.x;
      console.log("new width: ", newWidth);
      console.log("Position X: ", pos.x);
      console.log("MovX: ", event.movementX);

      if (newWidth >= maxWidth && event.movementX > 0) return;
      if (newWidth <= minWidth && event.movementX < 0) return;

      position.current = {
        x: pos.x + event.movementX,
      };

      element.style.transform = `translateX(${pos.x}px)`;
      console.log("Position X: ", pos.x);
    };

    const handleMouseUp = () => {
      if (!headerRef.current || !resizerRef.current) return;

      let headerWidth = parseInt(headerRef.current?.style.width, 10);

      // Set the width of header
      headerRef.current.style.width = `${position.current.x + headerWidth}px`;

      // set the resizer element back to 0 so it doesn't teleport in unexpected places
      resizerRef.current.style.transform = `translateX(0px)`;

      // Reset x position to 0 when mouse is up
      position.current.x = 0;
      console.log("Header WIDTH: ", headerRef.current.style.width);
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, minWidth, maxWidth]);

  return { resizerRef, headerRef, isResizing, handleMouseDown };
};
