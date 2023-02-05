import { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { useCreateProject } from "../../hooks/ProjectHooks";
import { Priority } from "@prisma/client";
import { useUserStore } from "../../store/user";
import { useRouter } from "next/router";
import { createProject } from "@/utils/projectFunctions";

const AddProjectModal: React.FC<{
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsModalOpen }) => {
  const closeHandler = () => setIsModalOpen(false);
  const router = useRouter();
  const { mutateAsync, isLoading } = useCreateProject();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lumpSum, setLumpSum] = useState("");
  const [dateType, setDateType] = useState("noDeadline");
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isPriority, setIsPriority] = useState(false);
  const [priority, setPriority] = useState<Priority>("None");
  const [isFormValid, setIsFormValid] = useState(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Waits until it creates newProject. Then it redirects
    const newProject = await mutateAsync({
      name,
      description,
      lumpSum: Number(lumpSum),
      startDate,
      dueDate,
      priority,
    });
    router.push(`/projects/${newProject?.id}`);
  };

  // Form Validation
  useEffect(() => {
    if (name.length > 0) {
      if (isPriority && priority === "None") {
        return setIsFormValid(false);
      }

      if (dateType !== "noDeadline") {
        if (dateType === "dueOn" && dueDate.length === 0) {
          return setIsFormValid(false);
        }
        if (
          dateType === "fromTo" &&
          dueDate.length === 0 &&
          startDate.length === 0
        ) {
          return setIsFormValid(false);
        }
      }

      return setIsFormValid(true);
    }
    setIsFormValid(false);
  }, [name, isPriority, priority, dateType, dueDate, startDate]);

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
            !isFormValid || isLoading ? "button--disabled" : ""
          }`}
          disabled={!isFormValid || isLoading}
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default AddProjectModal;
