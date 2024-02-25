import { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import { Priority, Project } from "@prisma/client";
import { useModalStore, useUserStore } from "../../store/user";
import Button from "../UI/Button";
import { z } from "zod";
import { useUpdateProject } from "@/hooks/ProjectHooks";
import { useRouter } from "next/router";
import useMenu from "@/hooks/useMenu";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";
import DropDown from "../UI/DropDown";

const EditProjectModal: React.FC<{
  isOpen: boolean;
  projectData: Project;
}> = ({ isOpen, projectData }) => {
  const { projectId } = useRouter().query;
  const userId = useUserStore((state) => state.userId as string);
  const setIsModalOpen = useModalStore(
    (state) => state.setIsEditProjectModalOpen
  );
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();

  const [name, setName] = useState(projectData.name ? projectData.name : "");
  const [description, setDescription] = useState(
    projectData.description ? projectData.name : ""
  );
  const [lumpSum, setLumpSum] = useState(
    projectData.lumpSum ? projectData.lumpSum + "" : ""
  );
  const [dueDate, setDueDate] = useState(
    projectData.dueDate ? new Date(projectData.dueDate) : new Date()
  );

  const [startDate, setStartDate] = useState(
    projectData.startDate + "" ? projectData.startDate + "" : ""
  );
  const [priority, setPriority] = useState<Priority>(
    projectData.priority ? projectData.priority : "None"
  );
  const [isPriority, setIsPriority] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const { mutateAsync: updateProject, error } = useUpdateProject();

  const closeHandler = () => {
    setIsModalOpen(false);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameCheck = z.string().min(1);
    if (nameCheck.parse(name)) {
      const response = await updateProject({
        projectId: projectData.id,
        projectData: {
          name,
          priority,
          description:
            description.trim().length === 0 ? undefined : description,
          lumpSum: Number(lumpSum) === 0 ? undefined : Number(lumpSum),
          startDate: startDate.length === 0 ? undefined : new Date(startDate),
          dueDate: dueDate.length === 0 ? undefined : new Date(dueDate),
        },
      });

      if (!response) {
        console.log("Error: ", error);
      }

      setIsModalOpen(false);
    }

    setIsModalOpen(false);
  };

  useEffect(() => {
    if (name.trim().length > 0) {
      setIsFormValid(true);
    }
  }, [name]);

  return (
    <Modal closeBtn={true} isOpen={isOpen} closeHandler={closeHandler}>
      <h1>Edit Project Details</h1>
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
            maxLength={40}
          />
        </div>
        <div className="form__input-container">
          <label className="form__input--label" htmlFor="lump-sum">
            Payout
          </label>
          <input
            className="form__input"
            type="number"
            step=".01"
            placeholder="1000.00"
            min="0"
            value={lumpSum}
            onChange={(e) => setLumpSum(e.target.value)}
            max={1000000}
          />
        </div>

        {/* Deadlines */}
        <fieldset className="">
          <label>Due Date</label>

          <DropDown className="edit-project__date-button">
            <DropDown.Button>
              {dueDate === null ? (
                <div className="edit-project__date--empty">
                  <div className="edit-project__date-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <span>No due date</span>
                </div>
              ) : (
                <div className="edit-project__date">
                  <div className="edit-project__date-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <span>{format(dueDate, "MMM dd")}</span>
                </div>
              )}
            </DropDown.Button>
            <DropDown.Menu position="bottom-left">
              <ReactDatePicker
                value={new Date(dueDate)}
                selected={new Date(dueDate)}
                onChange={(dueDate) => {
                  setDueDate(new Date(dueDate));
                }}
              />
            </DropDown.Menu>
          </DropDown>

          {/* <div className="date-button menu-button menu-button-container ">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen((state) => !state);
              }}
              ref={btnRef}
              className="menu-button"
            >
              {dueDate === null ? (
                <div className="edit-project__date--empty">
                  <div className="edit-project__date-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <span>No due date</span>
                </div>
              ) : (
                <div className="edit-project__date">
                  <div className="edit-project__date-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <span>{format(dueDate, "MMM dd")}</span>
                </div>
              )}
            </button>

            {isMenuOpen && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="menu"
                ref={menuRef}
              >
                <ReactDatePicker
                  value={new Date(dueDate)}
                  selected={new Date(dueDate)}
                  onChange={(dueDate) => {
                    setDueDate(new Date(dueDate));
                  }}
                />
              </div>
            )}
          </div> */}
        </fieldset>

        {/* Priority */}
        <fieldset className="priority">
          <div className="priority__checkbox">
            {/* <input
              type="checkbox"
              id="priority"
              defaultChecked={isPriority}
              onClick={() => {
                setIsPriority((state) => !state);
                setPriority("None");
              }}
            /> */}
            <label htmlFor="priority">Priority</label>
          </div>
          <ul className="priority__list">
            <li
              className={`priority__item ${
                priority === "None" ? "priority__item--active" : ""
              }`}
              onClick={() => setPriority("None")}
            >
              None
            </li>
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
        </fieldset>

        <div>
          <Button
            type="submit"
            className={`form__submit edit-project ${
              !isFormValid ? "button--disabled" : ""
            } `}
            disabled={!isFormValid}
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProjectModal;
