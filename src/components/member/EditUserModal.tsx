import React, { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import { toast } from "react-hot-toast";
import { useUpdateUser } from "@/hooks/MemberHooks";

const EditUserModal = ({
  isOpen,
  setIsOpen,
  initialName,
  initialEmail,
  initialPhone,
  userId,
}: {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  initialName: string;
  initialEmail: string;
  initialPhone: string;
  userId: string;
}) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail ? initialEmail : "");
  const [phone, setPhone] = useState(initialPhone ? initialPhone : "");
  const [emailError, setEmailError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { mutateAsync: updateUser } = useUpdateUser();

  useEffect(() => {
    if (name.length > 0) {
      setIsDisabled(false);
    }
  }, [name]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      if (true) {
        setEmailError(false);
        await updateUser({
          userData: {
            name,
            email,
            phone,
          },
          userId,
        });

        toast.success(`Saved`);
        setIsOpen(false);
      } else {
        setEmailError(true);
        return;
      }
    } catch (error) {
      console.log("ErRROR");
      setEmailError(true);
    }
  };
  return (
    <Modal
      closeBtn={true}
      isOpen={isOpen}
      closeHandler={() => {
        setIsOpen(false);
      }}
    >
      <div className="profile__edit">
        <h1 className="profile__edit-title">Edit profile</h1>
        <form onSubmit={submitHandler} className="profile__form">
          <label className="label" htmlFor="name">
            Name
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
              autoComplete="off"
              className={`input ${emailError ? "input--error" : ""}`}
              type="text"
              id="name"
            />
          </label>
          <label className="label" htmlFor="email">
            Email
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="john@gmail.com"
              autoComplete="off"
              className={`input ${emailError ? "input--error" : ""}`}
              type="text"
              id="email"
            />
          </label>
          <label className="label" htmlFor="phone">
            Phone
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="123-786-8888"
              autoComplete="off"
              className={`input ${emailError ? "input--error" : ""}`}
              type="text"
              id="phone"
            />
          </label>

          <button
            type="submit"
            className={`submit-button button ${
              isDisabled ? "submit-button--disabled" : null
            } ${emailError ? "submit-button--error" : ""}`}
            disabled={isDisabled}
          >
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditUserModal;
