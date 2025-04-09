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
        className={`${lightgrayBgColor} flex items-center rounded-lg shadow-lg w-max relative pr-1`}
      >
        {children}
        <div
          onClick={onClose}
          className=" bg-gray-500/40 rounded-full p-[4px] cursor-pointer flex justify-center items-center"
        >
          <Cancel className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};

export default Toast;
