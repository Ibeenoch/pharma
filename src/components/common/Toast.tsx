import React from "react";
import Cancel from "../../assets/icons/cancel-close.svg?react";
import { lightgrayBgColor } from "../../constants/appColor";
interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const Toast: React.FC<ToastProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div
      onClick={onClose}
      className="fixed right-0 top-[10%] lg:top-[30%] flex items-center justify-center "
    >
      {/* Toast content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${lightgrayBgColor} rounded-lg shadow-lg w-[400px] md:w-[550px] relative`}
      >
        <div
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-500/40 rounded-full p-[4px] cursor-pointer flex justify-center items-center"
        >
          <Cancel className="w-4 h-4 text-white" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Toast;
