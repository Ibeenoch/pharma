import React, { lazy } from "react";
const Mark = lazy(() => import("../../assets/icons/check-mark.svg?react"));
const Danger = lazy(() => import("../../assets/icons/exclamation-mark.svg?react"));

interface AlertModalProps {
  isSuccess: boolean;
  text: string;
}

const AlertModal: React.FC<AlertModalProps> = ({ isSuccess, text }) => {
  return (
    <div className="flex items-center">
      <div
        className={`px-2 flex justify-center w-10 h-10 ${
          isSuccess ? "bg-green-500" : "bg-red-500"
        } items-center rounded-lg`}
      >
        {isSuccess ? (
          <Mark className="w-5 h-5 text-white" />
        ) : (
          <Danger className="w-4 h-4 text-white" />
        )}
      </div>
      <p className="text-xs px-2">{text}</p>
    </div>
  );
};

export default AlertModal;
