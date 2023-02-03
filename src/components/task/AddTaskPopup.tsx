import { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { Priority } from "@prisma/client";
import useMenu from "@/hooks/useMenu";

const AddTaskPopup: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  const closeHandler = () => setIsOpen(false);
  //   const userId = useUserStore((state) => state.userId as string);
  //   const workspaceId = useUserStore((state) => state.workspaceId);
  //   const { mutateAsync } = useCreateProject();
  //   const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

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
    // Waits until it creates newTask. Then it redirects
    //   await mutateAsync({
    //   name,
    //   description,
    //   lumpSum: Number(lumpSum),
    //   startDate,
    //   dueDate,
    //   priority,
    //   workspaceId,
    //   ownerId: userId,
    // });
  };
  console.log("assignmee length", assigneeId.length);

  // Form Validation
  useEffect(() => {
    if (name.length > 0) {
      if (assigneeId.length === 0) {
        return setIsFormValid(false);
      }

      return setIsFormValid(true);
    }
    setIsFormValid(false);
  }, [name, priority, dueDate, startDate, assigneeId]);

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
            <button
              className="new-task__assignee-btn"
              onClick={() => setIsAssigneeMenuOpen(!isAssigneeMenuOpen)}
              ref={assigneeBtnRef}
            >
              Assignee
            </button>
            {/* Menu that loads all members of workspace */}
            <div
              className={`assignee-menu ${
                isAssigneeMenuOpen ? "assignee-menu--active" : ""
              }`}
              ref={assigneeMenuRef}
            >
              <div
                className="assignee-menu__item"
                onClick={() => setIsProjectMenuOpen(false)}
              >
                Jacob Rodriguez
              </div>
              <div
                className="assignee-menu__item"
                onClick={() => setIsProjectMenuOpen(false)}
              >
                Billy Bob
              </div>
            </div>
          </div>

          <label id="in">in</label>

          <div className="new-task__project-btn-container">
            <button
              className="new-task__project-btn"
              onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
              ref={projectBtnRef}
            >
              Project
            </button>
            {/* Loaded projects in workspace */}
            <div
              className={`project-menu ${
                isProjectMenuOpen ? "project-menu--active" : ""
              }`}
              ref={projectMenuRef}
            >
              <div
                className="project-menu__item"
                onClick={() => setIsProjectMenuOpen(false)}
              >
                Selfwork
              </div>
              <div
                className="project-menu__item"
                onClick={() => setIsProjectMenuOpen(false)}
              >
                Law firm Website
              </div>
            </div>
          </div>
        </div>

        <div className="new-task__priority">
          <button
            ref={priorityBtnRef}
            onClick={() => setIsPriorityMenuOpen(!isPriorityMenuOpen)}
          >
            {priority === null || priority === "None" ? (
              "Priority"
            ) : (
              <span>{priority}</span>
            )}
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
