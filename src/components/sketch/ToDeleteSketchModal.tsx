import React from "react";
import Modal from "../UI/Modal";

const ToDeleteSketchModal = ({
  isOpen,
  isDark,
  setIsOpen,
  deleteFunc,
}: {
  isOpen: boolean;
  isDark: boolean;
  setIsOpen: (isOpen: boolean) => void;
  deleteFunc: () => any;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      closeHandler={() => {
        setIsOpen(false);
      }}
      closeBtn={true}
      isDark={isDark}
      className="sketch__modal"
    >
      <div className="title">Delete sketch?</div>
      <div className="delete-body">
        <p className="delete-body__text">
          This cannot be undone. Your sketch will be deleted forever.
        </p>
        <div className="delete-body__buttons">
          <button
            className="delete-body__cancel-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            Cancel
          </button>
          <button className="delete-body__delete-btn" onClick={deleteFunc}>
            Delete sketch
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ToDeleteSketchModal;
