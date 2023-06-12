import useMenu from "@/hooks/useMenu";
import { TaskWithAssignee } from "@/types/types";
import React from "react";
import { getInitials } from "./UserCard";
import { useDeleteTask } from "@/hooks/TaskHooks";
import { taskPriorityClassName } from "../task/OneTaskRow";

const BoardTask = ({ task }: { task: TaskWithAssignee }) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { mutate: deleteTask } = useDeleteTask();

  console.log(taskPriorityClassName(task.priority));

  return (
    <div className="board-task" key={task.id}>
      <div className="board-task__header">
        <div className="board-task__name">{task.name}</div>
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
              Delete
            </div>
          </div>
        </div>
      </div>

      <ul className="tag-list">
        {task.tags.map((tag) => (
          <li className="tag" key={tag.id}>
            {tag.name}
          </li>
        ))}
      </ul>
      <div className="footer">
        <div className="footer__priority">
          <span className={`${taskPriorityClassName(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        {task.assignee === null ? null : (
          <div className="board-task__assignee">
            {getInitials(task.assignee?.name ? task.assignee.name : "Loading")}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardTask;
