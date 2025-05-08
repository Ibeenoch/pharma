import React, { FormEvent, lazy } from "react";
import Times from "../../../../assets/icons/cancel-close.svg?react";
const CustomText = lazy(() => import("../../../common/Text"));
const CustomInput = lazy(() => import("../../../common/Input"));
const CustomButton = lazy(() => import("../../../common/Button"));

interface PasswordResetProps {
  setCurrentPassword: React.Dispatch<React.SetStateAction<string>>;
  currentPassword: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  newPassword: string;
  cancelFunc: () => void;
}

const PasswordReset: React.FC<PasswordResetProps> = ({
  setCurrentPassword,
  currentPassword,
  setNewPassword,
  newPassword,
  cancelFunc,
}) => {
  const handleUpdatePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleUpdatePassword} className="pt-5">
      <CustomText
        text="Update Your Password"
        textType="normal"
        weightType="semibold"
      />
      <CustomInput
        label="Current Password"
        labelStyle="text-gray-500 text-xs"
        roundedBorder={true}
        onChange={setCurrentPassword}
        value={currentPassword}
        type="password"
        showFullWidth={true}
        isPassword={true}
      />
      <CustomInput
        label="New Password"
        labelStyle="text-gray-500 text-xs"
        roundedBorder={true}
        onChange={setNewPassword}
        value={newPassword}
        type="password"
        showFullWidth={true}
        isPassword={true}
      />
      <div className="flex gap-2 items-center my-2 justify-center">
        <CustomButton
          text="Cancel"
          type="button"
          fullwidth={true}
          showIcon={true}
          PreFixIcon={Times}
          onClick={cancelFunc}
        />
        <CustomButton
          text="Update Password"
          type="submit"
          borderRadiusType="threecurved"
          showArrow={true}
          fullwidth={true}
        />
      </div>
    </form>
  );
};

export default PasswordReset;
