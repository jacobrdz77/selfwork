import { Priority, Section, Tag, Task, TaskStatus, User } from "@prisma/client";
import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import MenuButton from "../UI/MenuButton";
import { useWorkspaceMembers } from "@/hooks/WorkspaceHooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import useMenu from "@/hooks/useMenu";
import { TaskWithAssignee } from "@/types/types";
import { useDeleteTask, useUpdateTask } from "@/hooks/TaskHooks";

const EditTaskDetails = ({
  task,
  setIsModalOpen,
}: {
  task: TaskWithAssignee;
  setIsModalOpen: (bool: boolean) => void;
}) => {
  const [description, setDescription] = useState(task.description);
  const [tags, setTags] = useState<Tag[] | []>(task.tags);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [assignee, setAssignee] = useState<User | null>(task.assignee);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate : null);
  const [priority, setPriority] = useState<Priority | undefined>(
    task?.priority
  );
  const [isFormValid, setIsFormValid] = useState(true);
  const [taskStatus, setTaskStatus] = useState(task.status);
  //   For Name
  const [oldName, setOldName] = useState(task.name);
  const [inputName, setInputName] = useState(task.name);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  const { mutateAsync: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  const focusOnInput = () => {
    // @ts-ignore
    inputRef.current!.focus();
  };
  const handleInputBlur = (e: any) => {
    let trimmedName = e.currentTarget.value.trim();
    if (trimmedName.length === 0) {
      trimmedName = "Write a task name";
    }
    if (oldName === trimmedName) {
      setInputName(trimmedName);
      console.log("NOPE");
      setIsInputFocused(false);
      return;
    } else {
      setInputName(trimmedName);
      setOldName(trimmedName);
    }
    // Switches to display button
    setIsInputFocused(false);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = await updateTask({
      taskId: task.id,
      taskData: {
        name: inputName,
        description: description!,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        status: taskStatus,
        assigneeId: assignee ? assignee.id : null,
      },
    });

    console.log("UPDATED: ", newTask);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isInputFocused === true) {
      focusOnInput();
    }
  }, [isInputFocused]);

  useEffect(() => {
    if (inputName.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [inputName]);

  return (
    <div className="task-detail">
      <div className="task-detail__header">
        <div className="task-detail__buttons">
          <button className="button">Mark complete</button>
          <StatusButton status={taskStatus!} setStatus={setTaskStatus} />
        </div>

        <div className="actions">
          <div
            className="close"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            <svg className="task-detail__icon" viewBox="0 0 320.591 320.591">
              <g>
                <g>
                  <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z" />
                  <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z" />
                </g>
              </g>
            </svg>
          </div>
          <div
            onClick={() => {
              deleteTask(task.id);
            }}
            className="delete"
          >
            <svg
              className="task-detail__icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>
        </div>
      </div>

      <form onSubmit={submitHandler} className="form">
        <div className="name">
          {/* <div
            className="name__input-placeholder"
            role="button"
            onClick={() => {
              setIsInputFocused(true);
            }}
          >
            {task?.name}
          </div> */}
          {isInputFocused ? (
            <input
              value={inputName}
              ref={inputRef}
              className="name__input"
              autoComplete="off"
              type="text"
              name="name"
              placeholder="Write a task name"
              onChange={(e) => {
                setInputName(e.currentTarget.value);
              }}
              onBlur={handleInputBlur}
            />
          ) : (
            <div
              className="name__input-placeholder"
              role="button"
              onClick={() => {
                setIsInputFocused(true);
              }}
            >
              {inputName}
            </div>
          )}
        </div>

        <div className="assignee section">
          <label>Assignee</label>
          <AssigneeButton assignee={assignee!} setAssignee={setAssignee} />
        </div>

        <div className="due-date section">
          <label>Due date</label>
          <DueDateButton dueDate={dueDate!} setDueDate={setDueDate} />
        </div>

        <div className="priority section">
          <label htmlFor="assignee">Priority</label>
          <PriorityButton priority={priority!} setPriority={setPriority} />
        </div>
        <div className="tags section">
          <label>Tags</label>
          {/* Tags list */}

          <TagsButton
            inputTags={tags!}
            tags={tags!}
            setTags={setTags}
            selectedTag={selectedTag}
          />
        </div>

        <div className="description">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="What is this task about?"
            value={description ? description : ""}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className={`form__submit button ${
              !isFormValid ? "button--disabled" : ""
            } `}
            disabled={!isFormValid}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskDetails;

const StatusButton = ({
  status,
  setStatus,
}: {
  status: TaskStatus;
  setStatus: Dispatch<
    SetStateAction<"Open" | "InProgress" | "InReview" | "Delayed" | "Done">
  >;
}) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  console.log("statsu: ", status);

  return (
    <div className="menu-button-container ">
      <button
        type="button"
        ref={btnRef}
        className={`menu-button data-selected status-button ${
          status === "Done" ? "status-button--done" : ""
        }`}
        onClick={() => setIsMenuOpen((state) => !state)}
      >
        {status === "Open" && (
          <div className="flex">
            <svg
              className={`sidebar__color-icon sidebar__color-icon--yellow-green status-icon`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Open
          </div>
        )}
        {status === "InProgress" && (
          <div className="flex">
            <svg
              className={`sidebar__color-icon sidebar__color-icon--blue`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            In Progress
          </div>
        )}
        {status === "InReview" && (
          <div className="flex">
            <svg
              className={`sidebar__color-icon sidebar__color-icon--aqua`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            In Review
          </div>
        )}
        {status === "Delayed" && (
          <div className="flex">
            <svg
              className={`sidebar__color-icon sidebar__color-icon--orange-yellow`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Delayed
          </div>
        )}
        {status === "Done" && (
          <div className="flex">
            {/* <svg
              className={`sidebar__color-icon sidebar__color-icon--forest`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="done-icon"
            >
              <path
                fillRule="evenodd"
                d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                clipRule="evenodd"
              />
            </svg>
            Done
          </div>
        )}
        {/* {status ? status : "Set Status"} */}

        <svg
          className={`icon ${isMenuOpen ? "icon--active" : ""}`}
          viewBox="0 0 6.3499999 6.3500002"
        >
          <g id="layer1" transform="translate(0 -290.65)">
            <path d="m2.2580394 291.96502a.26460982.26460982 0 0 0 -.1741496.46871l1.6190225 1.38699-1.6190225 1.38648a.26460982.26460982 0 1 0 .3436483.40049l1.8536335-1.58595a.26460982.26460982 0 0 0 0-.40256l-1.8536335-1.5875a.26460982.26460982 0 0 0 -.1694987-.0667z" />
          </g>
        </svg>
      </button>

      {isMenuOpen && (
        <div
          className="menu"
          ref={menuRef}
          onClick={(e) => {
            setIsMenuOpen(false);
          }}
        >
          <div
            className="item"
            onClick={() => {
              setStatus("Open");
            }}
          >
            <svg
              className={`sidebar__color-icon sidebar__color-icon--yellow-green`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Open
          </div>
          <div
            className="item"
            onClick={() => {
              setStatus("InProgress");
            }}
          >
            <svg
              className={`sidebar__color-icon sidebar__color-icon--blue`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            In Progress
          </div>
          <div
            className="item"
            onClick={() => {
              setStatus("InReview");
            }}
          >
            <svg
              className={`sidebar__color-icon sidebar__color-icon--aqua`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            In Review
          </div>
          <div
            className="item"
            onClick={() => {
              setStatus("Delayed");
            }}
          >
            <svg
              className={`sidebar__color-icon sidebar__color-icon--orange-yellow`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Delayed
          </div>
          <div
            className="item"
            onClick={() => {
              setStatus("Done");
            }}
          >
            <svg
              className={`sidebar__color-icon sidebar__color-icon--forest`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Done
          </div>
        </div>
      )}
    </div>
  );
};

const AssigneeButton = ({
  assignee,
  setAssignee,
}: {
  assignee: User;
  setAssignee: (assignee: User | null) => void;
}) => {
  const { members, status } = useWorkspaceMembers();
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  return (
    <div className="menu-button-container">
      <button
        type="button"
        ref={btnRef}
        className="menu-button data-selected"
        onClick={() => setIsMenuOpen((state) => !state)}
      >
        {assignee ? assignee.name : "Who should do this?"}
      </button>

      {assignee && (
        <div
          className="data-selected__close"
          onClick={(e) => {
            setAssignee(null);
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
      )}

      {isMenuOpen && (
        <div
          className="menu"
          ref={menuRef}
          onClick={(e) => {
            setIsMenuOpen(false);
          }}
        >
          {members?.map((assignee) => (
            <div
              className="item"
              key={assignee.id}
              onClick={() => {
                setAssignee(assignee);
                setIsMenuOpen(false);
              }}
            >
              <span className="item__name"> {assignee.name}</span>
              <span className="item__email"> {assignee.email}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DueDateButton = ({
  dueDate,
  setDueDate,
}: {
  dueDate: string | Date;
  setDueDate: Dispatch<SetStateAction<Date | null | string>>;
}) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();

  return (
    <div className="menu-button-container">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsMenuOpen((state) => !state);
        }}
        ref={btnRef}
        className="menu-button data-selected "
      >
        {dueDate ? format(new Date(dueDate), "MMM dd") : "When is it due?"}
      </button>
      {dueDate && (
        <div
          className="data-selected__close"
          onClick={(e) => {
            setDueDate(null);
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
      )}

      {isMenuOpen && (
        <div className="menu" ref={menuRef}>
          <DatePicker
            className="data-selected--dueDate"
            // selected={new Date(dueDate)}
            value={
              dueDate
                ? new Date(dueDate).toLocaleDateString()
                : new Date().toLocaleDateString()
            }
            onChange={(dueDate) => {
              setDueDate(new Date(dueDate!).toLocaleDateString());
            }}
          />
        </div>
      )}
    </div>
  );
};

const TagsButton = ({
  tags,
  selectedTag,
  setTags,
}: {
  tags: Tag[];
  selectedTag: Tag;
  setTags: (tag: Tag[] | null) => void;
}) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();

  return (
    <div className="menu-button-container">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsMenuOpen((state) => !state);
        }}
        ref={btnRef}
        className="menu-button data-selected data-selected--Tags"
      >
        <span> {selectedTag ? selectedTag + "" : "Add Tags"}</span>
      </button>

      {selectedTag ? (
        <div
          className="data-selected__close"
          onClick={(e) => {
            setTags(null);
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
      ) : null}

      {isMenuOpen && (
        <div className="menu" ref={menuRef}>
          {tags &&
            tags?.map((tag) => (
              <div
                key={tag.id}
                className="item"
                onClick={() => {
                  setIsMenuOpen(false);
                  // Add a way to append tags to the list of tags
                }}
              >
                {tag.name}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const PriorityButton = ({
  priority,
  setPriority,
}: {
  priority: Priority;
  setPriority: (priority: Priority) => void;
}) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  return (
    <div className="menu-button-container">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsMenuOpen((state) => !state);
        }}
        ref={btnRef}
        className="menu-button data-selected data-selected--Tags"
      >
        <span>{priority ? priority : "None"}</span>
      </button>

      {priority !== "None" && (
        <div
          className="data-selected__close"
          onClick={(e) => {
            setPriority("None");
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
      )}

      {isMenuOpen && (
        <div className="menu" ref={menuRef}>
          <div>
            <div
              className="item"
              onClick={() => {
                setPriority("None");
                setIsMenuOpen(false);
              }}
            >
              None
            </div>
            <div
              className="item"
              onClick={() => {
                setPriority("Low");
                setIsMenuOpen(false);
              }}
            >
              Low
            </div>
            <div
              className="item"
              onClick={() => {
                setPriority("Medium");
                setIsMenuOpen(false);
              }}
            >
              Medium
            </div>
            <div
              className="item"
              onClick={() => {
                setPriority("High");
                setIsMenuOpen(false);
              }}
            >
              High
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
