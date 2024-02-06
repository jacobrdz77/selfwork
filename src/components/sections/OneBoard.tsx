import { SectionWithTasks, TaskWithAssignee } from "@/types/types";
import React, { useEffect, useRef, useState } from "react";
import useMenu from "@/hooks/useMenu";
import { useDeleteSection, useUpdateSection } from "@/hooks/SectionHooks";
import BoardNewTask from "../task/BoardNewTask";
import BoardTask from "../task/BoardTask";
import { useCreateTask } from "@/hooks/TaskHooks";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useDndContextForSorting from "@/hooks/useDndContextForSorting";
import { useSortedTasks } from "@/hooks/TaskHooks";
import { DndContext } from "@dnd-kit/core";
import { useModalStore } from "store/user";

interface Board {
  section: SectionWithTasks;
  title: string;
  tasks: TaskWithAssignee[];
  isUserAssignedSection?: boolean;
}

const OneBoard: React.FC<Board> = ({
  section,
  title,
  isUserAssignedSection = false,
}) => {
  const { sortedtasks, setSortedtasks } = useSortedTasks(section.tasks);

  const [newTaskName, setNewTaskName] = useState("");
  const [oldName, setOldName] = useState(title);
  const [sectionInputName, setSectionInputName] = useState(title);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  const { mutate: createTask } = useCreateTask();
  const { mutate: updateSection } = useUpdateSection();
  const { mutate: deleteSection } = useDeleteSection(section.projectId!);

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
        order: section.tasks?.length!,
      });
    }
  });

  const isEditTaskModalOpen = useModalStore(
    (state) => state.isEditTaskModalOpen
  );
  // Makes it Draggable
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id, disabled: isEditTaskModalOpen });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Make Tasks inside Section Sortable
  const { sensors, handleDragEnd, handleDragStart } = useDndContextForSorting(
    "tasks",
    sortedtasks,
    setSortedtasks
  );

  // Name Input

  useEffect(() => {
    if (isInputFocused === true) {
      focusOnInput();
    }
  }, [isInputFocused]);

  const focusOnInput = () => {
    // @ts-ignore
    inputRef.current!.focus();
  };
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let trimmedName = e.currentTarget.value.trim();
    if (trimmedName.length === 0) {
      trimmedName = "Untitled Section";
    }
    if (oldName === trimmedName) {
      setSectionInputName(trimmedName);
      // console.log("NOPE");
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

  return (
    <div
      className="board"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
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
              maxLength={50}
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
            <ul
              className={`menu ${isMenuOpen ? "menu--active" : ""}`}
              ref={menuRef}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <li className="item">
                <button
                  className={`item--delete ${
                    isUserAssignedSection ? "item--disabled" : ""
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    deleteSection(section.id);
                  }}
                  disabled={isUserAssignedSection}
                >
                  Delete section
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="board-task-list">
          <SortableContext
            items={sortedtasks}
            strategy={verticalListSortingStrategy}
          >
            {sortedtasks &&
              sortedtasks.map((task) => (
                <BoardTask key={task.id} task={task} />
              ))}
          </SortableContext>

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
                  order: section.tasks?.length!,
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
      </DndContext>
    </div>
  );
};

export default OneBoard;
