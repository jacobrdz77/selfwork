import { useState, useRef, useEffect } from "react";

const BoardNewTask = ({
  name,
  setName,
  setNewTaskOpen,
  forwardRef,
  handleCreateTask,
}: {
  forwardRef: any;
  name: string;
  setName: any;
  setNewTaskOpen: (isOpen: boolean) => any;
  handleCreateTask: () => any;
}) => {
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameRef === null) return;
    nameRef.current?.focus();

    return () => {
      setName("");
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateTask();
              setNewTaskOpen(false);
            }
          }}
        />
      </div>
      <div className="new-task-board__buttons">
        <button
          className=" new-task-board__add"
          onClick={() => {
            handleCreateTask();
            setNewTaskOpen(false);
          }}
          type="button"
        >
          Add task
        </button>
        <button
          onClick={() => {
            setNewTaskOpen(false);
          }}
          className="new-task-board__close"
          aria-label="Close new task input"
          type="button"
        >
          <svg viewBox="0 0 320.591 320.591">
            <g>
              <g id="close_1_">
                <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z" />
                <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z" />
              </g>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BoardNewTask;
