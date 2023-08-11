import React, { FocusEvent, use, useEffect, useRef, useState } from "react";
import { Priority } from "@prisma/client";
import { format } from "date-fns";
import { TaskWithAssignee } from "@/types/types";
import { useTableWidthStore } from "store/table-width";
import { useUpdateTask } from "@/hooks/TaskHooks";
import EditTaskModal from "./EditTaskModal";
import useMenu from "@/hooks/useMenu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const formatDueDate = (taskDueDate: Date) => {
  return format(new Date(taskDueDate), "MMM dd");
};

const formatStatus = (status: any) => {
  if (status === "InProgress") {
    return "In Progress";
  } else if (status === "InReview") {
    return "In Review";
  } else {
    return status;
  }
};

export const taskPriorityClassName = (priority: Priority) => {
  switch (priority) {
    case "None":
      return "task__priority--none";
    case "Low":
      return "task__priority--low";
    case "Medium":
      return "task__priority--medium";
    case "High":
      return "task__priority--high";
    default:
      return "";
  }
};

const OneTaskRow = ({ task }: { task: TaskWithAssignee }) => {
  // Todo: get Task detail modal state from store
  const { isMenuOpen, btnRef, setIsMenuOpen } = useMenu();
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [status, setStatus] = useState(task.status);

  // Name
  const [oldName, setOldName] = useState(task.name);
  const [taskInputName, setTaskInputName] = useState(task.name);
  const inputRef = useRef(null);

  const { mutate: updateTask } = useUpdateTask();
  const { assigneeWidth, dueDateWidth, nameWidth, priorityWidth, statusWidth } =
    useTableWidthStore((state) => state);

  // Makes it Draggable
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Input
  const handleInputBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    setIsInputFocused(false);

    let trimmedName = e.currentTarget.value.trim();
    if (trimmedName.length === 0) {
      // Delete task
      return;
    }

    if (oldName === trimmedName) {
      setTaskInputName(trimmedName);
      // console.log("NOPE");
      return;
    } else {
      updateTask({
        taskId: task.id,
        taskData: { name: trimmedName },
      });
      setTaskInputName(trimmedName);
      setOldName(trimmedName);
    }
  };

  const focusOnInput = () => {
    // @ts-ignore
    inputRef.current!.focus();
  };

  useEffect(() => {
    if (isInputFocused === true) {
      focusOnInput();
    }
  }, [isInputFocused]);

  return (
    <>
      {isTaskDetailOpen && (
        <EditTaskModal
          task={task}
          isOpen={isTaskDetailOpen}
          setIsOpen={setIsTaskDetailOpen}
        />
      )}
      <div
        className={`task-row ${isMenuOpen ? "task--active" : ""}`}
        onClick={() => {
          setIsTaskDetailOpen(true);
          setIsMenuOpen(!isMenuOpen);
        }}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="task__drag">
          <svg className="" viewBox="0 0 24 24">
            <path d="M10,4A2,2,0,1,1,8,2,2,2,0,0,1,10,4ZM8,10a2,2,0,1,0,2,2A2,2,0,0,0,8,10Zm0,8a2,2,0,1,0,2,2A2,2,0,0,0,8,18ZM16,6a2,2,0,1,0-2-2A2,2,0,0,0,16,6Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,14Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,22Z" />
          </svg>
        </div>
        <div className="task">
          <div
            ref={btnRef}
            className="task__name task__cell"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            style={{ width: nameWidth }}
          >
            {isInputFocused ? (
              <input
                ref={inputRef}
                className="task__name-input"
                autoComplete="off"
                type="text"
                name="name"
                placeholder="Write a task name!"
                value={taskInputName}
                onChange={(e) => {
                  setTaskInputName(e.currentTarget.value);
                }}
                onBlur={handleInputBlur}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            ) : (
              <div
                className="task__name-placeholder"
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsInputFocused(true);
                }}
              >
                {taskInputName}
              </div>
            )}
          </div>
          <div
            className="task__assignee task__cell"
            style={{ width: assigneeWidth }}
          >
            <div>
              {task.assignee ? (
                task.assignee.name
              ) : (
                <div className="task__empty-icon"></div>
              )}
            </div>
          </div>
          <div
            className="task__date task__cell"
            style={{ width: dueDateWidth }}
          >
            <div>
              {task.dueDate ? (
                formatDueDate(task.dueDate)
              ) : (
                <div className="task__empty-icon"></div>
              )}
            </div>
          </div>
          <div
            className="task__status task__cell"
            style={{ width: statusWidth }}
          >
            <div>{formatStatus(status)}</div>
          </div>
          <div
            className="task__priority task__cell"
            style={{ width: priorityWidth }}
          >
            {/* <div> ICON HERE</div> */}

            <div className={taskPriorityClassName(task.priority)}>
              {task.priority}
            </div>
          </div>
        </div>
        <div className="task__cell task__cell--empty">{/* EMPTY */}</div>
      </div>
    </>
  );
};

export default OneTaskRow;
