import { useState, useRef, useEffect } from "react";

const BoardNewTask = ({
  name,
  setName,
  setNewTaskOpen,
  forwardRef,
}: {
  forwardRef: any;
  name: string;
  setName: any;
  setNewTaskOpen: (isOpen: boolean) => any;
}) => {
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameRef === null) return;
    nameRef.current?.focus();

    return () => {
      setName("");
      setNewTaskOpen(false);
    };
  }, [setName, setNewTaskOpen]);

  return (
    <div
      ref={forwardRef}
      className={`board-task new-task-board new-task-board--active`}
    >
      <div className="board-task__header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="check-icon"
        >
          <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <input
          ref={nameRef}
          value={name}
          type="text"
          className="board-task__name"
          placeholder="Write a task"
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNewTaskOpen(false)}
        />
      </div>
    </div>
  );
};

export default BoardNewTask;
