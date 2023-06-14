import useMenu from "@/hooks/useMenu";
import { TaskWithAssignee } from "@/types/types";
import React from "react";
import { getInitials } from "../UI/UserCard";
import { useDeleteTask } from "@/hooks/TaskHooks";
import { taskPriorityClassName } from "./OneTaskRow";

const BoardTask = ({ task }: { task: TaskWithAssignee }) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { mutate: deleteTask } = useDeleteTask();
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
                deleteTask(task.id);
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

        {task.assignee === null ? null : (
          <div className="board-task__assignee">
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

export default BoardTask;
