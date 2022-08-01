import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props: { onClose: () => void }) => {
  return (
    <div
      className="bg-black opacity-50 z-10 fixed top-0 left-0 w-screen h-screen"
      onClick={props.onClose}
    />
  );
};

const ModalOverlay = (props: { children: JSX.Element[] }) => {
  return (
    <div className="z-50 fixed top-[50%] left-[50%] max-w-[720px]">
      <div className="flex flex-col w-full">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlay");

const Modal = (props: { onClose: () => void; children: JSX.Element[] }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement as Element
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement as Element
      )}
    </>
  );
};

export default Modal;
