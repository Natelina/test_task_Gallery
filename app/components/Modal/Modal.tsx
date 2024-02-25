import React, { FC, ReactNode } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("body");

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: ReactNode | ReactNode[] | undefined;
}

const Modal: FC<Props> = ({ isOpen, setIsOpen, children }: Props) => {
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 9999,
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "1190px",
      height: "700px",
      padding: 0,
      border: "none",
      borderRadius: 0,
      overflow: "hidden",
    },
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
