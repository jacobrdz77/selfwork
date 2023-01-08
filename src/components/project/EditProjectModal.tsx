import { useState } from "react";
import Modal from "../UI/Modal";
import { Priority, Project } from "@prisma/client";
import { updateProject } from "../../utils/projectFunctions";
import { useUserStore } from "../../store/user";
import Button from "../UI/Button";

const EditProjectModal: React.FC<{
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  currentProjectData: Project;
}> = ({ isOpen, setIsModalOpen, currentProjectData }) => {
  const closeHandler = () => {
    setIsModalOpen(false);
  };
  // const {
  //   page,
  //   setPage,
  //   name,
  //   description,
  //   priority,
  //   handleNameChange,
  //   nameBlurHandler,
  //   isNameError,
  //   selectedClient,
  //   handleClientChange,
  //   clientBlurHandler,
  //   isClientError,
  //   handleDescriptionChange,
  //   resetForm,
  //   hourlyRate,
  //   startDate,
  //   dueDate,
  //   handlePriorityChange,
  //   handleEndDateChange,
  //   handleHourlyRateChange,
  //   handleStartDateChange,
  //   validateFirstPageHandler,
  //   submitHandler,
  // } = useProjectForm(closeHandler, currentProjectData);
  const userId = useUserStore((state) => state.userId as string);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lumpSum, setLumpSum] = useState("");
  const [dateType, setDateType] = useState("noDeadline");
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isPriority, setIsPriority] = useState(false);
  const [priority, setPriority] = useState<Priority>("None");
  const [isFormValid, setIsFormValid] = useState(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      name,
      description,
      lumpSum: Number(lumpSum),
      startDate,
      dueDate,
      priority,
      userId,
    });
    setIsModalOpen(false);
  };
  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <h1>Create a Project</h1>
      <form className="new-project form" onSubmit={submitHandler}>
        <div className="form__input-container">
          <label className="form__input--label" htmlFor="name">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="form__input"
            id="name"
            type="text"
            placeholder="Project Name"
            autoComplete="off"
          />
        </div>
        <div className="form__input-container">
          <label className="form__input--label" htmlFor="description">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form__input form__input--textarea"
            id="description"
            placeholder="An awesome description here!"
          />
        </div>
        <div className="form__input-container">
          <label className="form__input--label" htmlFor="lump-sum">
            Lump Sum ($)
          </label>
          <input
            className="form__input"
            type="number"
            step=".01"
            placeholder="1000.00"
            min="0"
            value={lumpSum}
            onChange={(e) => setLumpSum(e.target.value)}
          />
        </div>

        {/* Deadlines */}
        <fieldset className="new-project__dates-section">
          <ul className="new-project__dates-list">
            <div
              onClick={() => {
                setDateType("noDeadline");
                setStartDate("");
                setDueDate("");
              }}
            >
              <input
                className="new-project__dates-input"
                type="radio"
                id="no-deadline"
                name="deadline"
                value={dateType}
                defaultChecked={dateType === "noDeadline"}
              />
              <label htmlFor="no-deadline">No deadline</label>
            </div>

            <div
              onClick={() => {
                setDateType("dueOn");
                setStartDate("");
              }}
            >
              <input
                className="new-project__dates-input"
                type="radio"
                id="due-on"
                name="deadline"
                value={dateType}
                defaultChecked={dateType === "dueOn"}
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
                defaultChecked={dateType === "fromTo"}
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
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          )}

          {/* From - to */}
          {dateType === "fromTo" && (
            <div className="date-input--from-to">
              <input
                className="date-input"
                type="date"
                min={new Date().toISOString()}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span>-</span>
              <input
                className="date-input"
                type="date"
                min={new Date().toISOString()}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
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
              defaultChecked={isPriority}
              onClick={() => {
                setIsPriority((state) => !state);
                setPriority("None");
              }}
            />
            <label htmlFor="priority">Priority</label>
          </div>
          {isPriority ? (
            <ul className="priority__list">
              <li
                className={`priority__item ${
                  priority === "Low" ? "priority__item--active" : ""
                }`}
                onClick={() => setPriority("Low")}
              >
                Low
              </li>
              <li
                className={`priority__item ${
                  priority === "Medium" ? "priority__item--active" : ""
                }`}
                onClick={() => setPriority("Medium")}
              >
                Medium
              </li>
              <li
                className={`priority__item ${
                  priority === "High" ? "priority__item--active" : ""
                }`}
                onClick={() => setPriority("High")}
              >
                High
              </li>
            </ul>
          ) : null}
        </fieldset>
        <Button
          type="submit"
          className={`form__submit button--blue ${
            !isFormValid ? "button--disabled" : ""
          }`}
          disabled={!isFormValid}
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default EditProjectModal;
