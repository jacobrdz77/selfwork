import useMenu from "@/hooks/useMenu";
import { TaskWithAssignee } from "@/types/types";
import React from "react";
import { getInitials } from "../UI/UserCard";
import { useDeleteTask } from "@/hooks/TaskHooks";
import { taskPriorityClassName } from "./OneTaskRow";
import { format } from "date-fns";

const BoardTask = ({ task }: { task: TaskWithAssignee }) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { mutate: deleteTask } = useDeleteTask();
  const formatDueDate = (taskDueDate: Date) => {
    return format(new Date(taskDueDate), "MMM dd");
  };
  return (
    <div className="board-task" key={task.id}>
      <div className="board-task__header">
        <div className="board-task__name">
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
          {task.name}
        </div>
        <div
          className={`header__more-btn-container ${
            isMenuOpen && "header__more-btn-container--active"
          }`}
        >
          <div
            ref={btnRef}
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="board-task__more-btn"
            role="button"
          >
            <svg className="board-task__more-icon" viewBox="0 0 16 16">
              <path d="M2,6C0.896,6,0,6.896,0,8s0.896,2,2,2s2-0.896,2-2S3.104,6,2,6z M8,6C6.896,6,6,6.896,6,8s0.896,2,2,2s2-0.896,2-2  S9.104,6,8,6z M14,6c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S15.104,6,14,6z" />
            </svg>
          </div>
          <div
            className={`board-task__edit-menu ${
              isMenuOpen ? "board-task__edit-menu--active" : ""
            }`}
            ref={menuRef}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <div
              className="board-task__edit-menu-item board-task__edit-menu-item--delete"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              Edit Task
            </div>
            <div
              className="board-task__edit-menu-item board-task__edit-menu-item--delete"
              onClick={() => {
                setIsMenuOpen(false);
                deleteTask(task.id);
              }}
            >
              Delete
            </div>
          </div>
        </div>
      </div>

      <ul className="tag-list">
        {task.tags
          ? task.tags.map((tag) => (
              <li className="tag" key={tag.id}>
                {tag.name}
              </li>
            ))
          : null}
      </ul>

      <div className="footer">
        <div className="footer__priority">
          <span className={`${taskPriorityClassName(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        <div className="buttons">
          {task.dueDate === null ? (
            <DateButton />
          ) : (
            <div className="board-task__date">
              <span>{formatDueDate(task.dueDate)}</span>
            </div>
          )}
          {task.assignee === null ? (
            <AssigneeButton />
          ) : (
            <div className="board-task__assignee">
              <span>{getInitials(task.assignee.name!)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardTask;

const DateButton = () => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();

  return (
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
      <div className="board-task__add-date"></div>
    </div>
  );
};

export const AssigneeButton = () => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();

  return (
    <div className="board-task__assignee-container">
      <div
        ref={btnRef}
        onClick={(e) => {
          e.preventDefault();
          setIsMenuOpen(!isMenuOpen);
        }}
        className="board-task__assignee--empty"
      >
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
      {isMenuOpen && (
        <div className="board-task__add-assignee" ref={menuRef}>
          <div className="close">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="close-btn"
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
          <div className="content">
            <div>Assignee</div>
            <div className="assignee-form">
              <label className="label">
                <input
                  className="input"
                  type="text"
                  placeholder="Name or email"
                />
              </label>
              <span>or</span>

              <button className="button" onClick={() => {}}>
                Assign to Me
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
