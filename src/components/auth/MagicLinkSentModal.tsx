import React from "react";
import Modal from "../UI/Modal";

const MagicLinkSentModal: React.FC<{
  email: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setEmail: (email: string) => void;
  isOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsModalOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsModalOpen, email }) => {
  const closeHandler = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      className="magic-link-modal"
      closeBtn={true}
      isOpen={isOpen}
      closeHandler={closeHandler}
    >
      <h1>Check your email</h1>
      {/* Email image with checkmark */}
      <p>We sent an email with your magic link to {email}</p>
    </Modal>
  );
};

export default MagicLinkSentModal;
