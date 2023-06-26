import { useInviteMember } from "@/hooks/MemberHooks";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Modal from "../UI/Modal";
import validateEmail from "@/utils/validateEmail";
import { useSession } from "next-auth/react";

interface InviteMemberPopupProps {
  menuRef: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  projectId: string;
  projectName: string;
}

const InviteMemberPopup = ({
  menuRef,
  setIsOpen,
  projectId,
  isOpen,
  projectName,
}: InviteMemberPopupProps) => {
  const [newMemberEmail, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { mutateAsync: inviteMember } = useInviteMember();

  const { data } = useSession();

  useEffect(() => {
    if (newMemberEmail.length > 0) {
      setIsDisabled(false);
    }
  }, [newMemberEmail]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      if (validateEmail(newMemberEmail)) {
        setEmailError(false);
        await inviteMember({
          projectName,
          projectId,
          newMemberEmail,
          message,
          senderEmail: data?.user?.email ? data.user.email : "",
        });
        toast.success(`Invited new member: ${newMemberEmail}`);
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
      <div className="project-members__invite">
        <h1 className="project-members__invite__title">Invite a Member</h1>
        <form onSubmit={submitHandler} className="project-resources__add-form">
          <label className="label" htmlFor="email">
            Invite with email
            <input
              value={newMemberEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Add member by email"
              autoComplete="off"
              className={`input ${emailError ? "input--error" : ""}`}
              type="text"
              id="email"
            />
          </label>
          {emailError && <p className="error">Please enter a valid email. </p>}
          <label className="label" htmlFor="message">
            Message
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="What is this project for?"
              autoComplete="off"
              className="message"
              id="message"
            />
          </label>
          <button
            type="submit"
            className={`submit-button ${
              isDisabled ? "submit-button--disabled" : null
            } ${emailError ? "submit-button--error" : ""}`}
            disabled={isDisabled}
          >
            Invite member
          </button>
        </form>
      </div>
    </Modal>
  );
};
export default InviteMemberPopup;
