import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props: { onClose: () => void }) => {
  return <div className="" onClick={props.onClose} />;
};

const ModalOverlay = (props: { children: JSX.Element[] }) => {
  return (
    <div className="">
      <div className="">{props.children}</div>
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
