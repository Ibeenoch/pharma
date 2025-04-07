import React from "react";
import Mark from "../../assets/icons/check-mark.svg?react";
import Danger from "../../assets/icons/exclamation-mark.svg?react";

interface AlertModalProps {
  isSuccess: boolean;
  text: string;
}

const AlertModal: React.FC<AlertModalProps> = ({ isSuccess, text }) => {
  return (
    <div className="flex items-center">
      <div
        className={`p-2 flex justify-center w-14 h-14 ${
          isSuccess ? "bg-green-500" : "bg-red-500"
        } items-center rounded-lg`}
      >
        {isSuccess ? (
          <Mark className="w-5 h-5 text-white" />
        ) : (
          <Danger className="w-5 h-5 text-white" />
        )}
      </div>
      <p className="text-sm p-2">{text}</p>
    </div>
  );
};

export default AlertModal;
