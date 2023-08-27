import useMenu from "@/hooks/useMenu";
import { useEffect, useRef, useState } from "react";
import { useTableWidthStore } from "store/table-width";

const AddTaskRow = ({
  newTaskName,
  setNewTaskName,
  // setNewTaskOpen,
  forwardRef,
}: {
  forwardRef: any;
  newTaskName: string;
  setNewTaskName: any;
  setNewTaskOpen: (isOpen: boolean) => any;
}) => {
  const { isMenuOpen, btnRef, setIsMenuOpen } = useMenu();

  const { assigneeWidth, dueDateWidth, nameWidth, priorityWidth, statusWidth } =
    useTableWidthStore((state) => state);

  // For Name
  const [isInputFocused, setIsInputFocused] = useState(true);
  const inputRef = useRef(null);
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
    <div
      className={`task-row ${isMenuOpen ? "task--active" : ""}`}
      onClick={() => {
        // setIsTaskDetailOpen(true);
        setIsMenuOpen(!isMenuOpen);
      }}
      ref={forwardRef}
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
              value={newTaskName}
              onChange={(e) => {
                setNewTaskName(e.currentTarget.value);
              }}
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
              {newTaskName}
            </div>
          )}
        </div>
        <div
          className="task__assignee task__cell"
          style={{ width: assigneeWidth }}
        >
          <div>
            <div className="task__empty-icon"></div>
          </div>
        </div>
        <div className="task__date task__cell" style={{ width: dueDateWidth }}>
          <div>
            <div className="task__empty-icon"></div>
          </div>
        </div>
        <div className="task__status task__cell" style={{ width: statusWidth }}>
          {/* <div>{status}</div> */}
        </div>
        <div
          className="task__priority task__cell"
          style={{ width: priorityWidth }}
        >
          {/* <div> ICON HERE</div> */}

          {/* <div className={taskPriorityClassName(task.priority)}>
                {task.priority}
              </div> */}
        </div>
      </div>
      <div className="task__cell task__cell--empty">{/* EMPTY */}</div>
    </div>
  );
};

export default AddTaskRow;
