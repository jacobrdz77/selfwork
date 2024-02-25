import React from "react";
import { createPortal } from "react-dom";

const Backdrop: React.FC<{ onClose: () => void; isOpen: boolean }> = ({
  onClose,
  isOpen,
}) => {
  return (
    <div
      className={`${isOpen ? "" : "backdrop--hidden"} backdrop`}
      onClick={onClose}
    />
  );
};

const ModalOverlay: React.FC<{
  children?: JSX.Element[] | JSX.Element;
  onClose: () => void;
  isOpen: boolean;
  isDark?: boolean;
  closeBtn: boolean;
  className?: string;
}> = ({ children, onClose, isOpen, closeBtn, className, isDark }) => {
  return (
    <div
      className={
        `${isOpen ? "" : "modal--hidden"} modal ${
          isDark ? "modal--dark" : ""
        } ` + className
      }
    >
      {closeBtn && (
        <button onClick={onClose} className="modal__close">
          <svg viewBox="0 0 320.591 320.591">
            <g>
              <g id="close_1_">
                <path d="m30.391 318.583c-7.86.457-15.59-2.156-21.56-7.288-11.774-11.844-11.774-30.973 0-42.817l257.812-257.813c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875l-259.331 259.331c-5.893 5.058-13.499 7.666-21.256 7.288z" />
                <path d="m287.9 318.583c-7.966-.034-15.601-3.196-21.257-8.806l-257.813-257.814c-10.908-12.738-9.425-31.908 3.313-42.817 11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414-6.35 5.522-14.707 8.161-23.078 7.288z" />
              </g>
            </g>
          </svg>
        </button>
      )}

      <div className="modal__content">{children}</div>
    </div>
  );
};

const Modal: React.FC<{
  children: any;
  isOpen: boolean;
  closeHandler: () => any;
  closeBtn: boolean;
  className?: string;
  isDark?: boolean;
}> = ({ children, isOpen, closeHandler, closeBtn, className, isDark }) => {
  return createPortal(
    <div className={`${isOpen ? "" : "modal--hidden"} modal-container  `}>
      <Backdrop onClose={closeHandler} isOpen={isOpen} />
      <ModalOverlay
        className={className}
        closeBtn={closeBtn}
        onClose={closeHandler}
        isOpen={isOpen}
        isDark={isDark}
      >
        {children}
      </ModalOverlay>
    </div>,
    document.getElementById("modal")!
  );
};

export default Modal;
