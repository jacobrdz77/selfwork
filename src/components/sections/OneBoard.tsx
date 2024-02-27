import { SectionWithTasks, TaskWithAssignee } from "@/types/types";
import React, { useEffect, useRef, useState } from "react";
import useMenu from "@/hooks/useMenu";
import { useDeleteSection, useUpdateSection } from "@/hooks/SectionHooks";
import BoardNewTask from "../task/BoardNewTask";
import BoardTask, { BoardTaskOverlay } from "../task/BoardTask";
import { useCreateTask } from "@/hooks/TaskHooks";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useDndContextForSorting from "@/hooks/useDndContextForSorting";
import { useSortedTasks } from "@/hooks/TaskHooks";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useModalStore } from "store/user";
import DropDown from "../UI/DropDown";

interface Board {
  section: SectionWithTasks;
  isUserAssignedSection?: boolean;
}

const OneBoard = ({ section, isUserAssignedSection = false }: Board) => {
  const { sortedTasks, setSortedTasks } = useSortedTasks(section.tasks);

  const [newTaskName, setNewTaskName] = useState("");
  const [oldName, setOldName] = useState(section.name);
  const [sectionInputName, setSectionInputName] = useState(section.name);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  const { mutate: createTask } = useCreateTask();
  const { mutate: updateSection } = useUpdateSection();
  const { mutate: deleteSection } = useDeleteSection(section.projectId!);

  const isEditTaskModalOpen = useModalStore(
    (state) => state.isEditTaskModalOpen
  );
  // Makes it Draggable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    setDroppableNodeRef,
  } = useSortable({
    id: section.id,
    disabled: isEditTaskModalOpen,
    transition: null,
  });

  const style = {
    //@ts-ignore
    transform: CSS.Transform.toString({
      ...transform,
      scaleX: 1,
      scaleY: 1,
    }),
    transition,
  };

  const { sensors, handleDragEnd, handleDragStart, activeId } =
    useDndContextForSorting("tasks", sortedTasks, setSortedTasks);

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

  const handleCreateTask = () => {
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
  };

  const {
    btnRef: newTaskBtnRef,
    isMenuOpen: isNewTaskOpen,
    menuRef: newTaskRef,
    setIsMenuOpen: setNewTaskOpen,
  } = useMenu(handleCreateTask);

  return (
    <div ref={setDroppableNodeRef} className="board-container">
      <div
        className={`board ${isDragging ? "board--dragging" : ""}`}
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
          <DropDown className="board__edit-container" theme="dark">
            <DropDown.Button className="board__edit-btn">
              <svg className="board__edit-icon" viewBox="0 0 16 16">
                <path d="M2,6C0.896,6,0,6.896,0,8s0.896,2,2,2s2-0.896,2-2S3.104,6,2,6z M8,6C6.896,6,6,6.896,6,8s0.896,2,2,2s2-0.896,2-2  S9.104,6,8,6z M14,6c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S15.104,6,14,6z" />
              </svg>
            </DropDown.Button>
            <DropDown.Menu position="bottom-right">
              <DropDown.Item
                className={`delete ${isUserAssignedSection ? "disabled" : ""}`}
                onClick={() => {
                  deleteSection(section.id);
                }}
                disabled={isUserAssignedSection}
              >
                Delete section
              </DropDown.Item>
            </DropDown.Menu>
          </DropDown>
        </div>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="board-task-list">
            <SortableContext
              items={sortedTasks}
              strategy={verticalListSortingStrategy}
            >
              {sortedTasks &&
                sortedTasks.map((task) => (
                  <BoardTask key={task.id} task={task} />
                ))}

              <DragOverlay
                dropAnimation={{ duration: 0 }}
                style={{
                  zIndex: "9999",
                }}
              >
                {activeId && sortedTasks ? (
                  <BoardTaskOverlay
                    key={activeId}
                    task={sortedTasks.find((task) => task.id === activeId)!}
                  />
                ) : null}
              </DragOverlay>
            </SortableContext>

            {isNewTaskOpen && (
              <BoardNewTask
                forwardRef={newTaskRef}
                name={newTaskName}
                setName={setNewTaskName}
                setNewTaskOpen={setNewTaskOpen}
                handleCreateTask={handleCreateTask}
              />
            )}

            {!isNewTaskOpen && (
              <div
                ref={newTaskBtnRef}
                role="button"
                className="board-add-task"
                onClick={() => {
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
            )}
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export const OneBoardOverlay = ({ section }: Board) => {
  const { sortedTasks } = useSortedTasks(section.tasks);
  return (
    <div className="board ">
      <div className="board-title">
        <div className="name">
          <div className="section__input-placeholder" role="button">
            {section.name}
          </div>
        </div>
        {/* MORE BUTTON */}
        <div className={`board__more-btn-container`}>
          <div className="board__more-btn" role="button">
            <svg className="board-card__more-icon" viewBox="0 0 16 16">
              <path d="M2,6C0.896,6,0,6.896,0,8s0.896,2,2,2s2-0.896,2-2S3.104,6,2,6z M8,6C6.896,6,6,6.896,6,8s0.896,2,2,2s2-0.896,2-2  S9.104,6,8,6z M14,6c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S15.104,6,14,6z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="board-task-list">
        {sortedTasks &&
          sortedTasks.map((task) => <BoardTask key={task.id} task={task} />)}
      </div>

      <div role="button" className="board-add-task">
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
  );
};

export default OneBoard;
