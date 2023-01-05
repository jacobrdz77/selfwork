import Modal from "../ui/Modal";
import { createProject } from "../../utils/projectFunctions";
import useProjectForm from "../../hooks/useProjectForm";
import { upperCaseName } from "../../utils/uppercaseName";
import { useState, useEffect } from "react";

const AddProjectModal: React.FC<{
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsModalOpen }) => {
  const closeHandler = () => {
    setIsModalOpen(false);
  };
  const [isPriority, setIsPriority] = useState(false);
  const [priorityType, setPriorityType] = useState("");
  const [dateType, setDateType] = useState("noDeadline");

  const submitHandler = (e: SubmitEvent) => {
    e.preventDefault();
  };

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <h1>Create a Project</h1>
      <form className="new-project form" onSubmit={() => submitHandler}>
        <div className="form__input">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Project Name"
            autoComplete="off"
          />
        </div>
        <div className="form__input">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Your awesome description here..."
          />
        </div>
        <div className="form__input">
          <label htmlFor="lump-sum">Lump Sum</label>
          <input type="number" placeholder="1000.00" min="0" />
        </div>

        {/* Deadlines */}
        <fieldset className="new-project__dates-section">
          <ul className="new-project__dates-list">
            <div onClick={() => setDateType("noDeadline")}>
              <input
                className="new-project__dates-input"
                type="radio"
                id="no-deadline"
                name="deadline"
                value={dateType}
                checked={dateType === "noDeadline"}
              />
              <label htmlFor="no-deadline">No deadline</label>
            </div>

            <div onClick={() => setDateType("dueOn")}>
              <input
                className="new-project__dates-input"
                type="radio"
                id="due-on"
                name="deadline"
                value={dateType}
                checked={dateType === "dueOn"}
              />
              <label htmlFor="due-on">Due on</label>
            </div>

            <div onClick={() => setDateType("fromTo")}>
              <input
                className="new-project__dates-input"
                type="radio"
                id="from-to"
                name="deadline"
                value={dateType}
                checked={dateType === "fromTo"}
              />
              <label htmlFor="from-to">From - to</label>
            </div>
          </ul>

          {/* Due Date */}
          {dateType === "dueOn" && (
            <input
              className="date-input"
              type="date"
              min={new Date().toISOString()}
            />
          )}

          {/* From - to */}
          {dateType === "fromTo" && (
            <div className="date-input--from-to">
              <input
                className="date-input"
                type="date"
                min={new Date().toISOString()}
              />
              <span>-</span>
              <input
                className="date-input"
                type="date"
                min={new Date().toISOString()}
              />
            </div>
          )}
        </fieldset>

        {/* Priority */}
        <fieldset className="priority">
          <div className="priority__checkbox">
            <input
              type="checkbox"
              id="priority"
              checked={isPriority}
              onClick={() => {
                setIsPriority((state) => !state);
                setPriorityType("NONE");
              }}
            />
            <label htmlFor="priority">Priority</label>
          </div>
          {isPriority ? (
            <ul className="priority__list">
              <li
                className={`priority__item ${
                  priorityType === "NONE" ? "priority__item--active" : ""
                }`}
                onClick={() => setPriorityType("NONE")}
              >
                None
              </li>
              <li
                className={`priority__item ${
                  priorityType === "LOW" ? "priority__item--active" : ""
                }`}
                onClick={() => setPriorityType("LOW")}
              >
                Low
              </li>
              <li
                className={`priority__item ${
                  priorityType === "MEDIUM" ? "priority__item--active" : ""
                }`}
                onClick={() => setPriorityType("MEDIUM")}
              >
                Medium
              </li>
              <li
                className={`priority__item ${
                  priorityType === "HIGH" ? "priority__item--active" : ""
                }`}
                onClick={() => setPriorityType("HIGH")}
              >
                High
              </li>
            </ul>
          ) : null}
        </fieldset>
        <button
          type="submit"
          className="form__submit button button--blue button--disabled"
          disabled
        >
          Create
        </button>
      </form>
    </Modal>
  );
};

export default AddProjectModal;
