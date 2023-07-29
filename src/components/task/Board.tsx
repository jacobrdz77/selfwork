import { SectionWithTasks, TaskWithAssignee } from "@/types/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getInitials } from "../UI/UserCard";
import useMenu from "@/hooks/useMenu";
import { useDeleteSection, useUpdateSection } from "@/hooks/SectionHooks";
import BoardNewTask from "./BoardNewTask";
import BoardTask from "./BoardTask";
import { useCreateTask } from "@/hooks/TaskHooks";
import { XYCoord, useDrag, useDrop } from "react-dnd";

interface Board {
  title: string;
  section: SectionWithTasks;
  tasks: TaskWithAssignee[];
  moveBoard: (dragIndex: number, hoverIndex: number) => void;
  isUserAssignedSection?: boolean;
  // index: number;
}

const Board: React.FC<Board> = ({
  title,
  section,
  tasks,
  moveBoard,
  isUserAssignedSection = false,
  // index,
}) => {
  const { mutate: createTask } = useCreateTask();

  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const {
    btnRef: newTaskBtnRef,
    isMenuOpen: isNewTaskOpen,
    menuRef: newTaskRef,
    setIsMenuOpen: setNewTaskOpen,
  } = useMenu(async () => {
    if (newTaskName.trim().length > 0) {
      createTask({
        name: newTaskName,
        sectionId: section.id,
        description: "",
        assignee: null,
        priority: null,
      });
    }
  });

  const { mutate: deleteSection } = useDeleteSection();

  const [newTaskName, setNewTaskName] = useState("");

  const [oldName, setOldName] = useState(title);
  const [sectionInputName, setSectionInputName] = useState(title);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);
  const { mutate: updateSection } = useUpdateSection();

  const focusOnInput = () => {
    // @ts-ignore
    inputRef.current!.focus();
  };

  useEffect(() => {
    if (isInputFocused === true) {
      focusOnInput();
    }
  }, [isInputFocused]);

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let trimmedName = e.currentTarget.value.trim();
    if (trimmedName.length === 0) {
      trimmedName = "Untitled Section";
    }
    if (oldName === trimmedName) {
      setSectionInputName(trimmedName);
      console.log("NOPE");
      setIsInputFocused(false);
      return;
    } else {
      updateSection({
        sectionId: section.id,
        sectionData: { name: trimmedName },
      });
      setSectionInputName(trimmedName);
      setOldName(trimmedName);
    }
    // Switches to display button
    setIsInputFocused(false);
  };

  //********* THIS IS FOR REORDERING BOARDS ********/
  // Sorting Board
  // const ref = useRef(null);
  // const [{ isOver }, drop] = useDrop(() => ({
  //   // The type (or types) to accept - strings or symbols
  //   accept: "Board",
  //   // Props to collect
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //     handlerId: monitor.getHandlerId(),
  //     highlighted: monitor.canDrop(),
  //   }),
  //   hover(item, monitor) {
  //     if (!ref.current) {
  //       return;
  //     }
  //     const dragIndex = item.index;
  //     const hoverIndex = section.order;
  //     // Don't replace items with themselves
  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }
  //     // Determine rectangle on screen
  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();

  //     console.log("hoverBoundingRect: ", hoverBoundingRect);
  //     // Get vertical middle
  //     const hoverMiddleX =
  //       (hoverBoundingRect.left - hoverBoundingRect.right) / 2;
  //     // Determine mouse position
  //     const clientOffset = monitor.getClientOffset();
  //     // Get pixels to the top
  //     const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;
  //     // Only perform the move when the mouse has crossed half of the items height
  //     // When dragging downwards, only move when the cursor is below 50%
  //     // When dragging upwards, only move when the cursor is above 50%
  //     // Dragging downwards
  //     if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
  //       return;
  //     }
  //     // Dragging upwards
  //     if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
  //       return;
  //     }
  //     // Time to actually perform the action
  //     moveBoard(dragIndex, hoverIndex!);
  //     // Note: we're mutating the monitor item here!
  //     // Generally it's better to avoid mutations,
  //     // but it's good here for the sake of performance
  //     // to avoid expensive index searches.
  //     item.index = hoverIndex;
  //   },
  // }));

  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: "Board",
  //   item: { boardId: section.id, index: section.order },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // }));

  // drag(drop(ref));

  return (
    <div
      className="board"
      // ref={ref}
    >
      <div className="board-title">
        <div className="name">
          {isInputFocused ? (
            <input
              ref={inputRef}
              className="section__name-input"
              autoComplete="off"
              type="text"
              name="name"
              placeholder="New Section"
              value={sectionInputName}
              onChange={(e) => {
                setSectionInputName(e.currentTarget.value);
              }}
              onBlur={handleInputBlur}
            />
          ) : (
            <div
              className="section__input-placeholder"
              role="button"
              onClick={() => {
                setIsInputFocused(true);
              }}
            >
              {sectionInputName}
            </div>
          )}
        </div>
        {/* MORE BUTTON */}
        <div
          className={`board__more-btn-container ${isMenuOpen ? "active" : ""}`}
        >
          <div
            ref={btnRef}
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="board__more-btn"
            role="button"
          >
            <svg className="board-card__more-icon" viewBox="0 0 16 16">
              <path d="M2,6C0.896,6,0,6.896,0,8s0.896,2,2,2s2-0.896,2-2S3.104,6,2,6z M8,6C6.896,6,6,6.896,6,8s0.896,2,2,2s2-0.896,2-2  S9.104,6,8,6z M14,6c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S15.104,6,14,6z" />
            </svg>
          </div>
          {isMenuOpen && (
            <div
              className="menu"
              ref={menuRef}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <button
                className={`item ${
                  isUserAssignedSection ? "item--disabled" : ""
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  deleteSection(section.id);
                }}
                disabled={isUserAssignedSection}
              >
                {/* <svg className="board-card__edit-menu__icon" viewBox="0 0 24 24">
                <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
              </svg> */}
                Delete section
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="board-task-list">
        {tasks && tasks.map((task) => <BoardTask key={task.id} task={task} />)}
        {isNewTaskOpen && (
          <BoardNewTask
            forwardRef={newTaskRef}
            name={newTaskName}
            setName={setNewTaskName}
            setNewTaskOpen={setNewTaskOpen}
          />
        )}

        <div
          ref={newTaskBtnRef}
          role="button"
          className="board-add-task"
          onClick={() => {
            if (newTaskName.trim().length > 0) {
              createTask({
                name: newTaskName,
                sectionId: section.id,
                description: "",
                assignee: null,
                priority: null,
              });
            }
            setNewTaskOpen((state) => !state);
          }}
        >
          <svg
            fill="currentColor"
            className="sidebar__add-icon"
            viewBox="0 0 24 24"
          >
            <path d="m12 6a1 1 0 0 0 -1 1v4h-4a1 1 0 0 0 0 2h4v4a1 1 0 0 0 2 0v-4h4a1 1 0 0 0 0-2h-4v-4a1 1 0 0 0 -1-1z" />
          </svg>
          <span>Add Task</span>
        </div>
      </div>
    </div>
  );
};

export default Board;
