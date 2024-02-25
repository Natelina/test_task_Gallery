import { Pictures } from "@/app/types";
import React from "react";
import Modal from "../Modal/Modal";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  picture: Pictures;
}
const PictureModal = ({ isOpen, setIsOpen, picture }: Props) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="relative w-full h-full" onClick={() => setIsOpen(false)}>
        <img
          src={picture.url}
          alt="cat"
          className="block max-w-full max-h-full w-auto h-auto absolute top-2/4 left-2/4 translate-y-[-50%] translate-x-[-50%] z-10"
        />
      </div>
      <div
        onClick={() => setIsOpen(false)}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          background: `url(${picture.url})`,
          backgroundSize: "cover",
          filter: "blur(30px)",
        }}
      />
      ;
    </Modal>
  );
};

export default PictureModal;
