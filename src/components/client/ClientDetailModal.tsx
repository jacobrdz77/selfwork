import { Priority, Project, Section, Client, User } from "@prisma/client";
import React, { useState, useRef, useEffect } from "react";
import { useProjects } from "@/hooks/ProjectHooks";
import { useRouter } from "next/router";
import { useDeleteClient, useUpdateClient } from "@/hooks/ClientHooks";
import Modal from "../UI/Modal";
import validatePhone from "@/utils/validatePhone";
import validateEmail from "@/utils/validateEmail";
import { deleteClient } from "@/utils/clientFunctions";

const ClientDetailModal = ({
  client,
  setIsModalOpen,
  isModalOpen,
}: {
  client: Client;
  setIsModalOpen: (boolean: boolean) => void;
  isModalOpen: boolean;
}) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPhoneError, setPhoneError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { mutateAsync: updateClient } = useUpdateClient(client.id);
  const { projects, status: projectsStatus } = useProjects();

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
      console.log("NOPE");
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
      },
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isInputFocused === true) {
      focusOnInput();
    }
  }, [isInputFocused]);

  const { mutate: deleteClient } = useDeleteClient();
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

        <div className="form">
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

          <div className="email section">
            <label htmlFor="client">Email*</label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={emailBlurHandler}
              placeholder="john@gmail.com"
              className={`input ${isEmailError ? "input--error" : ""}`}
            />
          </div>

          <div className="company-name section">
            <label htmlFor="name">Company Name</label>
            <input
              id="address"
              type="text"
              className="input"
              value={companyName}
              placeholder="Google LLC"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="address section">
            <label>Business Address</label>
            <input
              className="input address"
              placeholder="1234 Lakeview"
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
            />
          </div>

          <div className="phone section">
            <label htmlFor="name">Phone Number</label>
            <input
              name="phone"
              type="text"
              placeholder="123-123-1234"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={phoneBlurHandler}
              className={`input ${isPhoneError ? "email--error" : ""}`}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ClientDetailModal;
