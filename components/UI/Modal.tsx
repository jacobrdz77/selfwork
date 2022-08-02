import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Backdrop: React.FC<{ onClose: () => void; isOpen: boolean }> = ({
  onClose,
  isOpen,
}) => {
  return (
    <div
      className={`${
        isOpen ? "" : "hidden"
      } bg-black opacity-50 z-0 fixed top-0 left-0 w-screen h-screen`}
      onClick={onClose}
    />
  );
};

const ModalOverlay = (props: {
  children: JSX.Element[];
  onClose: () => void;
  isOpen: boolean;
}) => {
  return (
    <div
      className={`${
        props.isOpen ? "" : "hidden"
      } z-50 fixed top-[50%] left-[50%] translate-x-[-50%]  translate-y-[-50%] max-w-[720px] max-h-[580px] maxsm:w-[90%] sm:w-[80%] rounded-xl border-black p-5 bg-white`}
    >
      <div className="flex flex-col w-full ">
        <div>
          <button onClick={props.onClose} className="w-full flex justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
};

const Modal = (props: {
  children: JSX.Element[];
  isOpen: boolean;
  closeHandler: () => void;
}) => {
  return (
    <>
      <Backdrop onClose={props.closeHandler} isOpen={props.isOpen} />
      <ModalOverlay onClose={props.closeHandler} isOpen={props.isOpen}>
        {props.children}
      </ModalOverlay>
    </>
  );
};

export default Modal;
