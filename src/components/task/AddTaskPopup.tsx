import { useState, useEffect } from "react";
import { Priority, Section, User } from "@prisma/client";
import useMenu from "@/hooks/useMenu";
import { useUserStore } from "store/user";
import AssigneeMenu from "./AssigneeMenu";
import NewTaskProjectMenu from "./NewTaskProjectMenu";
import NewTaskSectionButton from "./NewTaskSectionButton";
import { useCreateTask } from "@/hooks/TaskHooks";
import { toast } from "react-hot-toast";

const AddTaskPopup: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  const closeHandler = () => setIsOpen(false);
  const { mutate } = useCreateTask();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState<User | null>(null);
  const [project, setProject] = useState<{
    id: string;
    name: string;
    sections: Section[];
  } | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  // const [startDate, setStartDate] = useState("");
  // const [dueDate, setDueDate] = useState("");
  const {
    btnRef: assigneeBtnRef,
    menuRef: assigneeMenuRef,
    isMenuOpen: isAssigneeMenuOpen,
    setIsMenuOpen: setIsAssigneeMenuOpen,
  } = useMenu();
  const {
    btnRef: projectBtnRef,
    menuRef: projectMenuRef,
    isMenuOpen: isProjectMenuOpen,
    setIsMenuOpen: setIsProjectMenuOpen,
  } = useMenu();
  const {
    btnRef: priorityBtnRef,
    menuRef: priorityMenuRef,
    isMenuOpen: isPriorityMenuOpen,
    setIsMenuOpen: setIsPriorityMenuOpen,
  } = useMenu();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      name,
      description,
      priority,
      assignee,
      sectionId: selectedSection?.id,
    });
    setIsOpen(false);

    toast.success(
      <div className="toast__text-container">
        Added <span className="toast__name">{name}</span>
      </div>
    );
  };

  // Form Validation
  useEffect(() => {
    if (name.length > 0) {
      if (assignee === null) {
        return setIsFormValid(false);
      }

      return setIsFormValid(true);
    }
    setIsFormValid(false);
  }, [name, priority, assignee]);

  return (
    <div className={`new-task ${isOpen ? "" : "new-task--hidden"}`}>
      <div className="new-task__header">
        <span>New Task</span>
        <div className="new-task__close" onClick={() => setIsOpen(false)}>
          <svg className="new-task__close-icon" viewBox="0 0 320.591 320.591">
            <g>
              <g>
                <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z" />
                <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      <form className="new-task__form" onSubmit={submitHandler}>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="new-task__name"
          type="text"
          placeholder="Task Name"
          autoComplete="off"
        />
        <div className="new-task__assignee-project">
          <label id="for">For</label>

          <div className="new-task__assignee-btn-container">
            {assignee ? (
              <button className="new-task__data-selected">
                {assignee.name}
                <div
                  className="data-selected__close"
                  onClick={() => setAssignee(null)}
                >
                  <svg viewBox="0 0 320.591 320.591">
                    <g>
                      <g>
                        <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z" />
                        <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z" />
                      </g>
                    </g>
                  </svg>
                </div>
              </button>
            ) : (
              <button
                type="button"
                className="new-task__assignee-btn"
                onClick={() => setIsAssigneeMenuOpen(!isAssigneeMenuOpen)}
                ref={assigneeBtnRef}
              >
                Assignee
              </button>
            )}

            {/* Menu that loads all members of workspace */}
            {isAssigneeMenuOpen && (
              <AssigneeMenu
                setAssignee={setAssignee}
                assigneeMenuRef={assigneeMenuRef}
                isAssigneeMenuOpen={isAssigneeMenuOpen}
                setIsAssigneeMenuOpen={setIsAssigneeMenuOpen}
              />
            )}
          </div>

          <label id="in">in</label>

          <div className="new-task__project-btn-container">
            {project ? (
              <button
                type="button"
                className="new-task__data-selected"
                onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
                ref={projectBtnRef}
              >
                {project.name}

                {/* Section button inside Project button */}
                <NewTaskSectionButton
                  setSelectedSection={setSelectedSection}
                  selectedSection={selectedSection}
                  sections={project.sections}
                />
                <div
                  className="data-selected__close"
                  onClick={(e) => {
                    setProject(null);
                    e.stopPropagation();
                  }}
                >
                  <svg viewBox="0 0 320.591 320.591">
                    <g>
                      <g>
                        <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z" />
                        <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z" />
                      </g>
                    </g>
                  </svg>
                </div>
              </button>
            ) : (
              <button
                type="button"
                className="new-task__project-btn"
                onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
                ref={projectBtnRef}
              >
                Project
              </button>
            )}

            {/* Loaded projects in workspace */}
            {isProjectMenuOpen && (
              <NewTaskProjectMenu
                isProjectMenuOpen={isProjectMenuOpen}
                projectMenuRef={projectMenuRef}
                setIsProjectMenuOpen={setIsProjectMenuOpen}
                setProject={setProject}
              />
            )}
          </div>
        </div>

        <div className="new-task__priority">
          <button
            type="button"
            ref={priorityBtnRef}
            onClick={() => setIsPriorityMenuOpen(!isPriorityMenuOpen)}
          >
            {priority === null ? "Priority" : <span>{priority}</span>}
          </button>
          <div
            className={`priority__menu ${
              isPriorityMenuOpen ? "priority__menu--active" : ""
            }`}
            ref={priorityMenuRef}
          >
            <div
              className="priority__choice"
              onClick={() => {
                setPriority("None");
                setIsPriorityMenuOpen(false);
              }}
            >
              None
            </div>
            <div
              className="priority__choice"
              onClick={() => {
                setPriority("Low");
                setIsPriorityMenuOpen(false);
              }}
            >
              Low
            </div>
            <div
              className="priority__choice"
              onClick={() => {
                setPriority("Medium");
                setIsPriorityMenuOpen(false);
              }}
            >
              Medium
            </div>
            <div
              className="priority__choice"
              onClick={() => {
                setPriority("High");
                setIsPriorityMenuOpen(false);
              }}
            >
              High
            </div>
          </div>
        </div>

        <div className="new-task__description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>

        {/* Deadlines */}

        {/* Priority */}
        <footer className="new-task__footer">
          <button
            type="submit"
            className={`new-task__submit ${
              !isFormValid ? "new-task__submit--disabled" : ""
            }`}
            disabled={!isFormValid}
          >
            Create Task
          </button>
        </footer>
      </form>
    </div>
  );
};

export default AddTaskPopup;
