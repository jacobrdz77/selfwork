import { useState, useEffect, useRef, useCallback } from "react";
import Modal from "../UI/Modal";
import { useCreateProject } from "../../hooks/ProjectHooks";
import { Client, Priority, User } from "@prisma/client";
import { useRouter } from "next/router";
import { useClients } from "@/hooks/ClientHooks";
import useMenu from "@/hooks/useMenu";
import usePlaceHolder from "@/hooks/usePlaceHolder";

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
  const { clients, status } = useClients();
  const [clientSelected, setClientSelected] = useState<Client | null>(null);
  const [clientName, setClientName] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProject = await mutateAsync({
      name,
      description,
      lumpSum: Number(lumpSum),
      startDate,
      dueDate,
      priority,
      clientId: clientSelected ? clientSelected.id : undefined,
    });
    setIsModalOpen(false);
    router.push(`/projects/${newProject?.id}/overview`);
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
    <Modal closeBtn={true} isOpen={isOpen} closeHandler={closeHandler}>
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
            placeholder="Write your project's title"
            autoComplete="off"
          />
        </div>

        <div className="form__input-container">
          <label className="form__input--label" htmlFor="name">
            Choose a client
          </label>

          <ClientsMenu
            selectedClient={clientSelected!}
            setSelectedClient={setClientSelected}
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
        <div className="submit-container">
          <button
            type="submit"
            className={`button form__submit ${
              !isFormValid || isLoading ? "form__submit--disabled" : ""
            }`}
            disabled={!isFormValid || isLoading}
          >
            <span>Create Project</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProjectModal;

export const ClientsMenu = ({
  selectedClient,
  setSelectedClient,
}: {
  selectedClient: Client;
  setSelectedClient: any;
}) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
  const [searchClient, setSearchClient] = useState(
    selectedClient ? selectedClient.name : ""
  );
  const { clients, status } = useClients();
  const [filteredClients, setFilteredClients] = useState(clients);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);
  const focusOnInput = useCallback(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current!.focus();
    }
  }, []);
  const handleInputBlur = (e: any) => {
    // Switches to display button
    setIsInputFocused(false);
  };

  // useEffect(() => {
  //   if (inputRef) {
  //     focusOnInput();
  //   }
  // }, [focusOnInput]);

  useEffect(() => {
    if (isInputFocused === true) {
      focusOnInput();
    }
  }, [isInputFocused, focusOnInput]);

  useEffect(() => {
    setFilteredClients(() => {
      if (clients) {
        const newClients = clients.filter((client) => {
          return client.name
            .toLocaleLowerCase()
            .includes(searchClient.trim().toLocaleLowerCase());
        });

        return newClients;
      }
    });
  }, [clients, searchClient]);

  // console.log(
  //   "Selected Client: ",
  //   selectedClient ? selectedClient.name : "",
  //   "\nInput focused: ",
  //   isInputFocused
  // );

  return (
    <div className="new-project__client menu-container data-selected">
      <button
        type="button"
        ref={btnRef}
        className="menu-button"
        onClick={() => setIsMenuOpen((state) => !state)}
      >
        {/* Placeholder */}
        {selectedClient && !isInputFocused && (
          <div
            className="client-placeholder"
            onClick={() => {
              setIsInputFocused(true);
            }}
          >
            <span>{selectedClient.name}</span>
            <div
              className="remove-button"
              aria-label="Remove assignee"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedClient(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="remove-icon"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Input text */}
        {isInputFocused && (
          <input
            ref={inputRef}
            value={searchClient}
            onChange={(e) => {
              setSearchClient(e.target.value);
            }}
            onBlur={handleInputBlur}
            className="form__input"
            id="name"
            type="text"
            placeholder="John Smith"
            autoComplete="off"
          />
        )}
        {/* Empty */}
        {!isInputFocused && !selectedClient && (
          <input
            ref={inputRef}
            value={searchClient}
            onChange={(e) => {
              setSearchClient(e.target.value);
            }}
            onBlur={handleInputBlur}
            className="form__input"
            id="name"
            type="text"
            placeholder="John Doe"
            autoComplete="off"
          />
        )}
      </button>
      {isMenuOpen && (
        <div
          className="menu"
          ref={menuRef}
          onClick={(e) => {
            setIsMenuOpen(false);
          }}
        >
          {/* Filters first using the input name */}
          {filteredClients!.map((client) => (
            <div
              className="item"
              key={client.id}
              onClick={() => {
                setSelectedClient(client);
                setIsMenuOpen(false);
              }}
            >
              <span className="item__name"> {client.name}</span>
            </div>
          ))}

          {filteredClients?.length === 0 && (
            <div className="item">
              <span className="item__name">No client found</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// const AssigneeButton = ({
//   assignee,
//   setAssignee,
// }: {
//   assignee: User;
//   setAssignee: (assignee: User | null) => void;
// }) => {
//   const { members, status } = useWorkspaceMembers();
//   const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();
//   return (
//     <div className="menu-button-container">
//       <button
//         type="button"
//         ref={btnRef}
//         className="menu-button data-selected"
//         onClick={() => setIsMenuOpen((state) => !state)}
//       >
//         {assignee ? assignee.name : "Who should do this?"}
//       </button>

//       {assignee && (
//         <div
//           className="data-selected__close"
//           onClick={(e) => {
//             setAssignee(null);
//           }}
//         >
//           <svg viewBox="0 0 320.591 320.591">
//             <g>
//               <g>
//                 <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z" />
//                 <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z" />
//               </g>
//             </g>
//           </svg>
//         </div>
//       )}

//       {isMenuOpen && (
//         <div
//           className="menu"
//           ref={menuRef}
//           onClick={(e) => {
//             setIsMenuOpen(false);
//           }}
//         >
//           {members?.map((assignee) => (
//             <div
//               className="item"
//               key={assignee.id}
//               onClick={() => {
//                 setAssignee(assignee);
//                 setIsMenuOpen(false);
//               }}
//             >
//               <span className="item__name"> {assignee.name}</span>
//               <span className="item__email"> {assignee.email}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
