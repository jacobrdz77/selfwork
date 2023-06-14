import { TaskWithAssignee } from "@/types/types";
import { useState, useRef, useEffect } from "react";
import { getInitials } from "../UI/UserCard";
import { useCreateTask } from "@/hooks/TaskHooks";

const BoardNewTask = ({
  task,
  isNewTaskOpen,
  setNewTaskOpen,
  forwardRef,
}: {
  forwardRef: any;
  task: TaskWithAssignee;
  isNewTaskOpen: boolean;
  setNewTaskOpen: (isOpen: boolean) => any;
}) => {
  const [name, setName] = useState("");
  const nameRef = useRef<HTMLInputElement>();
  const { mutate: createTask } = useCreateTask();

  const handleInputBlur = (e) => {
    let trimmedName = e.currentTarget.value.trim();
    if (trimmedName.length === 0) {
      // Removes if empty space
      setNewTaskOpen(false);
    } else {
      createTask({
        name,
        sectionId: task.sectionId,
        description: "",
        assignee: null,
        priority: null,
      });
      setName("");
      setNewTaskOpen(false);
    }
  };

  useEffect(() => {
    if (nameRef === null) return;
    nameRef.current?.focus();

    return () => {
      setName("");
      setNewTaskOpen(false);
    };
  }, []);

  return (
    <div
      ref={forwardRef}
      className={`board-task new-task-board new-task-board--active`}
      key={task.id}
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
          placeholder="Write a task."
          onChange={(e) => setName(e.target.value)}
          onBlur={handleInputBlur}
        />
      </div>

      <div className="footer">
        <div className="buttons">
          <div className="board-task__date--empty">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="icon"
            >
              <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <div className="board-task__assignee--empty">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="icon"
            >
              <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        </div>

        {task.assignee === null ? null : (
          <div className="board-task__assignee" role="button">
            <span>
              {getInitials(
                task.assignee?.name ? task.assignee.name : "Loading"
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardNewTask;
