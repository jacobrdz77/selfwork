import { FocusEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDeleteSection, useUpdateSection } from "@/hooks/SectionHooks";
import useMenu from "@/hooks/useMenu";
import { SectionWithTasks } from "@/types/types";
import OneTaskRow from "../task/OneTaskRow";
import AddTaskRow from "../task/AddTaskRow";
import { useCreateTask, useTasksSection } from "@/hooks/TaskHooks";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useSortedTasks from "@/hooks/useSortedTasks";
import useDndContextForSorting from "@/hooks/useDndContextForSorting";
import { DndContext } from "@dnd-kit/core";

interface Props {
  section: SectionWithTasks;
  isUserAssignedSection?: boolean;
  focusOnNewInput?: (func: () => void) => void;
}

const SectionListView = ({
  section,
  focusOnNewInput,
  isUserAssignedSection = false,
}: Props) => {
  const [showTasks, setShowTasks] = useState(true);
  const [oldName, setOldName] = useState(section.name);
  const [sectionInputName, setSectionInputName] = useState(section.name);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const { mutate: deleteSection } = useDeleteSection(section.projectId!);
  const { mutate: updateSection } = useUpdateSection();

  const { tasks } = useTasksSection(section.id);
  const { sortedtasks, setSortedtasks } = useSortedTasks(tasks ? tasks : []);

  const { sensors, handleDragEnd, handleDragStart, activeIndex } =
    useDndContextForSorting("tasks", sortedtasks, setSortedtasks);

  // For NEW TASK
  const [newTaskName, setNewTaskName] = useState("");
  const { mutate: createTask } = useCreateTask();
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
        order: section.tasks.length,
      });
      setNewTaskName("");
    }
  });

  // Makes it draggable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // For Name
  const focusOnInput = () => {
    // @ts-ignore
    inputRef.current!.focus();
  };

  const handleInputBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
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

  useEffect(() => {
    if (focusOnNewInput) {
      focusOnNewInput(focusOnInput);
    }
  }, [focusOnNewInput]);

  useEffect(() => {
    if (isInputFocused === true) {
      focusOnInput();
    }
  }, [isInputFocused]);

  return (
    <div
      className="section-list-container"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="section-container">
        <div className="section">
          {/* Todo: absolute position drag */}
          <div className="section__drag">
            <svg className="section__drag-icon" viewBox="0 0 24 24">
              <path d="M10,4A2,2,0,1,1,8,2,2,2,0,0,1,10,4ZM8,10a2,2,0,1,0,2,2A2,2,0,0,0,8,10Zm0,8a2,2,0,1,0,2,2A2,2,0,0,0,8,18ZM16,6a2,2,0,1,0-2-2A2,2,0,0,0,16,6Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,14Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,22Z" />
            </svg>
          </div>
          {/* Toggle view tasks */}
          <div
            className={`section__toggle section__button ${
              showTasks ? "section__toggle--open" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setShowTasks(!showTasks);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="section__icon"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="section__name">
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
          {/* Add new task */}
          <div
            role="button"
            ref={btnRef}
            className="section__add section__button"
            onClick={(e) => {
              setNewTaskOpen(!isNewTaskOpen);
              setShowTasks(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="section__icon"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* More menu */}
          <div className="section__more-container">
            <div
              ref={btnRef}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsMenuOpen((state) => !state);
              }}
              className="section__more section__button"
              role="button"
            >
              <svg className="section__icon" viewBox="0 0 16 16">
                <path d="M2,6C0.896,6,0,6.896,0,8s0.896,2,2,2s2-0.896,2-2S3.104,6,2,6z M8,6C6.896,6,6,6.896,6,8s0.896,2,2,2s2-0.896,2-2  S9.104,6,8,6z M14,6c-1.104,0-2,0.896-2,2s0.896,2,2,2s2-0.896,2-2S15.104,6,14,6z" />
              </svg>
            </div>
            <div
              className={`section__more-menu ${
                isMenuOpen ? "section__more-menu--active " : ""
              }`}
              ref={menuRef}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <button
                className={`section__more-menu-item section__more-menu-item--delete ${
                  isUserAssignedSection ? "disabled" : ""
                } `}
                onClick={() => {
                  deleteSection(section.id);
                  toast.success(`Deleted ${sectionInputName}`);
                  setIsMenuOpen(false);
                }}
                disabled={isUserAssignedSection}
              >
                <svg className="section__icon" viewBox="0 0 24 24">
                  <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
                </svg>
                Delete Section
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* CONTAINER OF TASKS */}
      {!isDragging && showTasks && (
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="section__tasks">
            {isNewTaskOpen && (
              <AddTaskRow
                forwardRef={newTaskRef}
                newTaskName={newTaskName}
                setNewTaskName={setNewTaskName}
                setNewTaskOpen={setNewTaskOpen}
              />
            )}

            <SortableContext
              items={sortedtasks ? sortedtasks : []}
              strategy={verticalListSortingStrategy}
            >
              {sortedtasks.map((task) => (
                <OneTaskRow key={task.id} task={task} />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      )}
    </div>
  );
};

export default SectionListView;

export const DraggingSectionListView = ({
  sectionName,
}: {
  sectionName: string;
}) => {
  return (
    <div className="section section--dragging">
      {/* Todo: absolute position drag */}
      <div className="section__drag">
        <svg className="section__drag-icon" viewBox="0 0 24 24">
          <path d="M10,4A2,2,0,1,1,8,2,2,2,0,0,1,10,4ZM8,10a2,2,0,1,0,2,2A2,2,0,0,0,8,10Zm0,8a2,2,0,1,0,2,2A2,2,0,0,0,8,18ZM16,6a2,2,0,1,0-2-2A2,2,0,0,0,16,6Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,14Zm0,8a2,2,0,1,0-2-2A2,2,0,0,0,16,22Z" />
        </svg>
      </div>
      {/* Toggle view tasks */}
      <div className={`section__toggle section__button`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="section__icon"
        >
          <path
            fillRule="evenodd"
            d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="section__name">
        <div className="section__input-placeholder" role="button">
          {sectionName}
        </div>
      </div>
    </div>
  );
};
