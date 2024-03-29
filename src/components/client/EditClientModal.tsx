import { Priority, Project, Section, Client, User } from "@prisma/client";
import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useProjects } from "@/hooks/ProjectHooks";
import { useDeleteClient, useUpdateClient } from "@/hooks/ClientHooks";
import Modal from "../UI/Modal";
import validatePhone from "@/utils/validatePhone";
import validateEmail from "@/utils/validateEmail";
import Button from "../UI/Button";
import useMenu from "@/hooks/useMenu";
import { ClientStatus } from "@/types/types";

const EditClientModal = ({
  client,
  setIsModalOpen,
  isModalOpen,
}: {
  client: Client;
  setIsModalOpen: (boolean: boolean) => void;
  isModalOpen: boolean;
}) => {
  const [email, setEmail] = useState(client.email ? client.email : "");
  const [phone, setPhone] = useState(client.phone ? client.phone : "");
  const [companyName, setCompanyName] = useState(
    client.companyName ? client.companyName : ""
  );
  const [businessAddress, setBusinessAddress] = useState(
    client.businessAddress ? client.businessAddress : ""
  );
  const [clientStatus, setClientStatus] = useState(
    client.status ? client.status : "Pending"
  );
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPhoneError, setPhoneError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { projects, status: projectsStatus } = useProjects();

  const { mutate: updateClient } = useUpdateClient(client.id);
  const { mutate: deleteClient } = useDeleteClient();

  //   For Name
  const [oldName, setOldName] = useState(client?.name);
  const [inputName, setInputName] = useState(client?.name);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  const focusOnInput = () => {
    // @ts-ignore
    inputRef.current!.focus();
  };
  const handleInputBlur = (e: any) => {
    let trimmedName = e.currentTarget.value.trim();
    if (trimmedName.length === 0) {
      trimmedName = "Write a client name";
    }
    if (oldName === trimmedName) {
      setInputName(trimmedName);
      // console.log("NOPE");
      setIsInputFocused(false);
      return;
    } else {
      updateClient({
        clientData: { name: trimmedName },
      });
      setInputName(trimmedName);
      setOldName(trimmedName);
    }
    // Switches to display button
    setIsInputFocused(false);
  };

  const phoneBlurHandler = (e: any) => {
    if (!phone) return;
    if (phone.trim().length === 0) {
      return;
    }
    if (validatePhone(phone)) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  const emailBlurHandler = (e: any) => {
    if (!email) return;
    if (validateEmail(email)) {
      setIsEmailError(false);
    } else {
      setIsEmailError(true);
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    updateClient({
      clientData: {
        name: inputName,
        companyName,
        businessAddress,
        email,
        phone,
        status: clientStatus,
      },
    });

    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isInputFocused === true) {
      focusOnInput();
    }
  }, [isInputFocused]);

  // useEffect(() => {
  //   return () => {
  //     setEmail(client.email ? client.email : "");
  //     setPhone(client.phone ? client.phone : "");
  //     setCompanyName(client.companyName ? client.companyName : "");
  //     setPhone(client.phone ? client.phone : "");
  //     setPhone(client.phone ? client.phone : "");
  //     setPhone(client.phone ? client.phone : "");
  //     setPhone(client.phone ? client.phone : "");
  //     // const [email, setEmail] = useState(client.email ? client.email : "");
  //     // const [phone, setPhone] = useState(client.phone ? client.phone : "");
  //     // const [companyName, setCompanyName] = useState(
  //     //   client.companyName ? client.companyName : ""
  //     // );
  //     // const [businessAddress, setBusinessAddress] = useState(
  //     //   client.businessAddress ? client.businessAddress : ""
  //     // );
  //     // const [isNameError, setIsNameError] = useState(false);
  //     // const [isEmailError, setIsEmailError] = useState(false);
  //     // const [isPhoneError, setPhoneError] = useState(false);
  //     // const [isFormValid, setIsFormValid] = useState(false);
  //     // const { projects, status: projectsStatus } = useProjects();

  //     // const { mutate: updateClient } = useUpdateClient(client.id);
  //     // const { mutate: deleteClient } = useDeleteClient();

  //     // //   For Name
  //     // const [oldName, setOldName] = useState(client?.name);
  //     // const [inputName, setInputName] = useState(client?.name);
  //     // const [isInputFocused, setIsInputFocused] = useState(false);
  //   };
  // }, []);

  return (
    <Modal
      closeBtn={false}
      isOpen={isModalOpen}
      closeHandler={() => {
        setIsModalOpen(false);
      }}
    >
      <div className="client-details task-detail">
        <div className="client-details__header task-detail__header">
          <div className="task-detail__buttons">
            <StatusButton status={clientStatus!} setStatus={setClientStatus} />
          </div>
          <div className="actions">
            <div
              className="close"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              <svg
                className="client-details__icon"
                viewBox="0 0 320.591 320.591"
              >
                <g>
                  <g>
                    <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z" />
                    <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z" />
                  </g>
                </g>
              </svg>
            </div>
            <div className="delete" onClick={() => deleteClient(client.id)}>
              <svg
                className="client-detail__icon"
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
            {isInputFocused ? (
              <input
                value={inputName}
                ref={inputRef}
                className="name__input"
                autoComplete="off"
                type="text"
                name="name"
                placeholder="Write a client name"
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
          <div className=" form__input-container email">
            <label className="form__input--label">Email</label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={emailBlurHandler}
              placeholder="john@gmail.com"
              className={`form__input ${isEmailError ? "input--error" : ""}`}
            />
          </div>

          <div className="form__input-container phone">
            <label className="form__input--label">Phone Number</label>
            <input
              name="phone"
              type="text"
              placeholder="123-123-1234"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={phoneBlurHandler}
              className={`form__input ${isPhoneError ? "email--error" : ""}`}
            />
          </div>

          <div className="form__input-container company-name">
            <label className="form__input--label">Company Name</label>
            <input
              type="text"
              className="form__input"
              value={companyName}
              placeholder="Google LLC"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="form__input-container address">
            <label className="form__input--label">Business Address</label>
            <input
              type="text"
              className="form__input"
              value={businessAddress}
              placeholder="1234 Lakeview"
              onChange={(e) => setBusinessAddress(e.target.value)}
            />
          </div>

          <div>
            <Button
              type="submit"
              className="form__submit client-submit"
              // className={`form__submit ${
              //   !isFormValid ? "button--disabled" : ""
              // } `}
              // disabled={!isFormValid}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditClientModal;

const StatusButton = ({
  status,
  setStatus,
}: {
  status: ClientStatus;
  setStatus: Dispatch<SetStateAction<ClientStatus>>;
}) => {
  const { btnRef, isMenuOpen, menuRef, setIsMenuOpen } = useMenu();

  return (
    <div className="client-details__status menu-button-container ">
      <button
        type="button"
        ref={btnRef}
        className={`menu-button data-selected status-button`}
        onClick={() => setIsMenuOpen((state) => !state)}
      >
        {status === "Active" && (
          <div className="flex">
            <svg
              className={`sidebar__color-icon client-details__status--active status-icon`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Active
          </div>
        )}
        {status === "Pending" && (
          <div className="flex">
            <svg
              className={`sidebar__color-icon client-details__status--pending`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Pending
          </div>
        )}
        {status === "Closed" && (
          <div className="flex">
            <svg
              className={`sidebar__color-icon client-details__status--closed`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Closed
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
          className={`menu ${isMenuOpen ? "menu--active" : ""}`}
          ref={menuRef}
          onClick={(e) => {
            setIsMenuOpen(false);
          }}
        >
          <div
            className="item"
            onClick={() => {
              setStatus("Active");
            }}
          >
            <svg
              className={`sidebar__color-icon client-details__status--active`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Active
          </div>
          <div
            className="item"
            onClick={() => {
              setStatus("Pending");
            }}
          >
            <svg
              className={`sidebar__color-icon client-details__status--pending`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Pending
          </div>
          <div
            className="item"
            onClick={() => {
              setStatus("Closed");
            }}
          >
            <svg
              className={`sidebar__color-icon client-details__status--closed`}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M10.4,4h3.2c2.2,0,3,0.2,3.9,0.7c0.8,0.4,1.5,1.1,1.9,1.9s0.7,1.6,0.7,3.9v3.2c0,2.2-0.2,3-0.7,3.9c-0.4,0.8-1.1,1.5-1.9,1.9s-1.6,0.7-3.9,0.7h-3.2c-2.2,0-3-0.2-3.9-0.7c-0.8-0.4-1.5-1.1-1.9-1.9c-0.4-1-0.6-1.8-0.6-4v-3.2c0-2.2,0.2-3,0.7-3.9C5.1,5.7,5.8,5,6.6,4.6C7.4,4.2,8.2,4,10.4,4z"></path>
            </svg>
            Closed
          </div>
        </div>
      )}
    </div>
  );
};
