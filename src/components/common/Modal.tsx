import React from "react";
import Cancel from "../../assets/icons/cancel-close.svg?react";
import { lightgrayBgColor } from "../../constants/appColor";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
      style={{
        background: "rgba( 128, 128, 128, 0.5 )",
      }}
      className="fixed inset-0 flex items-center justify-center bg-opacity-10 z-60 backdrop-blur-sm"
    >
      {/* Modal content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${lightgrayBgColor} p-4 rounded-lg shadow-lg w-[400px] md:w-[550px] relative`}
      >
        <div
          onClick={onClose}
          className="absolute top-5 right-5 bg-gray-500/40 rounded-full p-[4px] cursor-pointer flex justify-center items-center"
        >
          <Cancel className="w-5 h-5 text-white" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
