import { Priority, Project, Section, Task, User } from "@prisma/client";
import React, { useState, useRef, useEffect } from "react";
import MenuButton from "../UI/MenuButton";
import { useWorkspaceMembers } from "@/hooks/WorkspaceHooks";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useProjects } from "@/hooks/ProjectHooks";
import useMenu from "@/hooks/useMenu";
import { TaskWithAssignee } from "@/types/types";

const EditTaskDetails = ({
  task,
  setIsModalOpen,
}: {
  task: TaskWithAssignee;
  setIsModalOpen: (bool: boolean) => void;
}) => {
  const { projects, status: projectsStatus } = useProjects();
  const [description, setDescription] = useState(task?.description);
  const [project, setProject] = useState<Project | null>(null);
  const [assignee, setAssignee] = useState(task?.assignee);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [dueDate, setDueDate] = useState(task?.dueDate);
  const [priority, setPriority] = useState<Priority | undefined>(
    task?.priority
  );
  const [isFormValid, setIsFormValid] = useState(true);
  //   For Name
  const [oldName, setOldName] = useState(task?.name);
  const [inputName, setInputName] = useState(task?.name);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

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
      //   updateSection({
      //     sectionId: section.id,
      //     sectionData: { name: trimmedName },
      //   });
      setInputName(trimmedName);
      setOldName(trimmedName);
    }
    // Switches to display button
    setIsInputFocused(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <button className="button">Mark complete</button>
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
          <div className="delete">
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
          <AssigneeButton assignee={assignee} setAssignee={setAssignee} />
        </div>

        <div className="due-date section">
          <label>Due date</label>
          <DueDateButton dueDate={dueDate!} setDueDate={setDueDate} />
        </div>

        <div className="task__project section">
          <label>Project</label>

          <ProjectsButton
            inputProjects={projects!}
            selectedProject={project!}
            setProject={setProject}
          />
        </div>

        <div className="priority section">
          <label htmlFor="assignee">Priority</label>
          <PriorityButton priority={priority!} setPriority={setPriority} />
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
  dueDate: Date;
  setDueDate: (date: Date | null) => void;
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
            selected={new Date(dueDate)}
            onChange={(dueDate) => {
              setDueDate(new Date(dueDate!));
            }}
          />
        </div>
      )}
    </div>
  );
};

const ProjectsButton = ({
  inputProjects,
  selectedProject,
  setProject,
}: {
  inputProjects: Project[];
  selectedProject: Project;
  setProject: (project: Project | null) => void;
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
        className="menu-button data-selected data-selected--projects"
      >
        <span>
          {" "}
          {selectedProject ? selectedProject.name : "Add to projects"}
        </span>
      </button>

      {selectedProject ? (
        <div
          className="data-selected__close"
          onClick={(e) => {
            setProject(null);
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
          {inputProjects &&
            inputProjects?.map((project) => (
              <div
                key={project.id}
                className="item"
                onClick={() => {
                  setProject(project);
                  setIsMenuOpen(false);
                }}
              >
                {project.name}
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
        className="menu-button data-selected data-selected--projects"
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
