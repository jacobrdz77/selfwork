import useMenu from "@/hooks/useMenu";
import { Priority, Section, User } from "@prisma/client";
import React, { useState, useRef } from "react";
import NewTaskSectionButton from "./NewTaskSectionButton";
import NewTaskProjectMenu from "./NewTaskProjectMenu";
import { useOneTask } from "@/hooks/TaskHooks";

const EditTaskDetails = ({
  taskId,
  setIsModalOpen,
}: {
  taskId: string;
  setIsModalOpen: (bool: boolean) => void;
}) => {
  const { task, status } = useOneTask(taskId);
  const [description, setDescription] = useState(task?.description);
  const [assignee, setAssignee] = useState<User | null>(null);
  const [project, setProject] = useState<{
    id: string;
    name: string;
    sections: Section[];
  } | null>(null);
  const [dueDate, setDueDate] = useState(task?.dueDate);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [priority, setPriority] = useState<Priority | undefined>(
    task?.priority
  );
  const [isFormValid, setIsFormValid] = useState(false);

  //   For Name
  const [oldName, setOldName] = useState(task?.name);
  const [inputName, setInputName] = useState(task?.name);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

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

  //   Menus
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
  const {
    btnRef: dueDateBtnRef,
    menuRef: dueDateMenuRef,
    isMenuOpen: isDueDateMenuOpen,
    setIsMenuOpen: setIsDueDateMenuOpen,
  } = useMenu();
  const {
    btnRef: moreBtnRef,
    menuRef: moreMenuRef,
    isMenuOpen: isMoreMenuOpen,
    setIsMenuOpen: setIsMoreMenuOpen,
  } = useMenu();

  return (
    <div className="task-detail">
      <div className="task-detail__header">
        <button className="button">Mark complete</button>
        <div className="actions">
          <div className="delete">Delete</div>
          <div
            className="close"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            X
          </div>
        </div>
      </div>

      <div className="form">
        {status === "success" ? (
          <div className="task__name">
            {isInputFocused ? (
              <input
                value={inputName}
                ref={inputRef}
                className="task__name-input"
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
                className="section__input-placeholder"
                role="button"
                onClick={() => {
                  setIsInputFocused(true);
                }}
              >
                {inputName}
              </div>
            )}
          </div>
        ) : null}

        <div className="assignee">
          <label htmlFor="assignee">Assignee</label>{" "}
          {assignee ? (
            <button id="assignee" className="new-task__data-selected">
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
              id="assignee"
              type="button"
              className="task__assignee-btn"
              onClick={() => setIsAssigneeMenuOpen(!isAssigneeMenuOpen)}
              ref={assigneeBtnRef}
            >
              Who should do this?
            </button>
          )}
        </div>
        <div className="due-date">
          <label htmlFor="assignee">Due date</label>{" "}
          {task?.dueDate ? (
            <button
              className="new-task__data-selected"
              onClick={() => setIsDueDateMenuOpen(!isDueDateMenuOpen)}
              id="assignee"
              type="button"
              ref={dueDateBtnRef}
            >
              {}
              <div
                className="data-selected__close"
                onClick={() => setDueDate(new Date())}
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
              className="task__due-date-btn"
              id="assignee"
              type="button"
              onClick={() => setIsDueDateMenuOpen(!isDueDateMenuOpen)}
              ref={dueDateBtnRef}
            >
              When is it due?
            </button>
          )}
        </div>
        <div className="task__project">
          <label htmlFor="projects">Projects</label>
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
              Add to projects
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
        {/* <div className="priority">
          <label htmlFor="assignee">Assignee</label>{" "}
          {assignee ? (
            <button id="assignee" className="new-task__data-selected">
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
              id="assignee"
              type="button"
              className="task__assignee-btn"
              onClick={() => setIsAssigneeMenuOpen(!isAssigneeMenuOpen)}
              ref={assigneeBtnRef}
            >
              Who should do this?
            </button>
          )}
        </div> */}

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
      </div>
    </div>
  );
};

export default EditTaskDetails;
