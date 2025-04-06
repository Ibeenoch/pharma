import {
  adminDefaultBgColor,
  lightgrayBgColor,
} from "../../../../constants/appColor";
import CustomText from "../../../common/Text";
import img from "../../../../assets/images/person4.png";
import LongArrow from "../../../../assets/icons/arrow-up.svg?react";
import Plus from "../../../../assets/icons/plus-slim.svg?react";
import Times from "../../../../assets/icons/cancel-close.svg?react";
import { useState } from "react";
import CustomInput from "../../../common/Input";
import CustomButton from "../../../common/Button";
import Modal from "../../../common/Modal";
import PasswordReset from "./PasswordReset";

const AccountSettingsDetails = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isEditEmail, setIsEditEmail] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [isEditPassword, setIsEditPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<{
    email?: string;
    currentPassword?: string;
    newPassword?: string;
  }>({});

  const enableEmailEdit = () => {
    setIsEditEmail(true);
  };
  const cancelEmailEdit = () => {
    setIsEditEmail(false);
  };

  const handleEditUpdateSubmission = () => {};

  const enablePasswordEdit = () => {
    setIsEditPassword(true);
  };

  const cancelPasswordEdit = () => {
    setIsEditPassword(false);
  };

  return (
    <div className={`mt-18 mx-auto w-full ${adminDefaultBgColor}`}>
      <section className={`${lightgrayBgColor} p-4 rounded-xl mb-3  pb-8`}>
        <CustomText
          text="Account"
          textType="normal"
          weightType="semibold"
          extraStyle="my-1"
        />
        <CustomText
          text="Real-time information and activities of your profile"
          textType="small"
          color="text-gray-500"
          extraStyle="my-1 pb-4 border-b border-gray-300"
        />

        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <img
              src={img}
              alt="profile pics"
              className="w-18 h-18 rounded-full border border-gray-300"
            />
            <div>
              <CustomText
                text="Profile picture"
                textType="normal"
                weightType="semibold"
                extraStyle="my-1"
              />
              <CustomText
                text="PNG, JPEG under 15mb"
                textType="small"
                color="text-gray-500"
              />
            </div>
          </div>

          <div>
            <div className="p-1 rounded-lg border border-gray-300 cursor-pointer flex items-center">
              <LongArrow className="w-4 h-4 text-gray-500" />
              <CustomText
                text="Upload new picture"
                textType="small"
                color="text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className={`pt-3 `}>
          <CustomText text="Full Name" textType="small" weightType="semibold" />
        </div>

        <div className="md:flex items-center justify-between gap-4 pb-4 border-b border-gray-300">
          <CustomInput
            label="First Name"
            labelStyle="text-gray-500 text-xs"
            roundedBorder={true}
            onChange={setFirstName}
            showborder={false}
            value="Adewale"
            type="text"
            disabled={true}
            showFullWidth={true}
          />
          <CustomInput
            label="Last Name"
            labelStyle="text-gray-500 text-xs"
            roundedBorder={true}
            onChange={setLastName}
            value="Bolaji"
            type="text"
            disabled={true}
            showborder={false}
            showFullWidth={true}
          />
        </div>

        <div className={`py-1 `}>
          <CustomText
            text="Contact Email"
            textType="small"
            weightType="semibold"
          />
          <CustomText
            text="Manage Your Account Email"
            textType="extrasmall"
            weightType="medium"
            color="text-gray-500"
            extraStyle="my-1"
          />
        </div>

        <div className="md:flex items-center justify-between gap-4 pb-4 border-b border-gray-300">
          <CustomInput
            label="Email Address"
            labelStyle="text-gray-500 text-xs"
            roundedBorder={true}
            onChange={setEmail}
            value={isEditEmail ? email : "Adewalebolaji@gmail.com"}
            type="email"
            disabled={!isEditEmail}
            showFullWidth={true}
            showborder={false}
            placeholder="Write your updated email"
          />
          <div className="w-full flex justify-end">
            {isEditEmail ? (
              <div className="flex gap-2 items-center  mt-3 md:mt-8">
                <CustomButton
                  text="Cancel"
                  textSize="small"
                  weightType="normal"
                  onClick={cancelEmailEdit}
                  showIcon={true}
                  PreFixIcon={Times}
                />
                <CustomButton
                  text="Update"
                  textSize="small"
                  weightType="normal"
                  showArrow={true}
                  onClick={handleEditUpdateSubmission}
                  borderRadiusType="threecurved"
                />
              </div>
            ) : (
              <div
                onClick={enableEmailEdit}
                className="w-max p-2 mt-3 md:mt-8 rounded-lg border border-gray-300 flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-gray-500" />
                <CustomText
                  text="Update Email Address"
                  color="text-gray-500"
                  textType="small"
                  weightType="normal"
                />
              </div>
            )}
          </div>
        </div>

        <div className={`pt-3 `}>
          <CustomText text="Password" textType="small" weightType="semibold" />
          <CustomText
            text="Modify your current password"
            textType="extrasmall"
            weightType="medium"
            color="text-gray-500"
            extraStyle="my-1"
          />
        </div>

        <div className="md:flex items-center justify-between gap-4 pb-4 border-b border-gray-300">
          <CustomInput
            label="Current Password"
            labelStyle="text-gray-500 text-xs"
            roundedBorder={true}
            showborder={false}
            onChange={setCurrentPassword}
            value={isEditPassword ? currentPassword : "Adewale"}
            type="password"
            disabled={!isEditPassword}
            showFullWidth={true}
            isPassword={true}
          />
          <div className="w-full flex justify-end">
            <div
              onClick={enablePasswordEdit}
              className="w-max p-2 mt-3 md:mt-8 rounded-lg border border-gray-300 flex items-center gap-1"
            >
              <Plus className="w-3 h-3 text-gray-500" />
              <CustomText
                text="Update Password"
                color="text-gray-500"
                textType="small"
                weightType="normal"
              />
            </div>
          </div>
          {isEditPassword && (
            <Modal
              isOpen={isEditPassword}
              onClose={cancelPasswordEdit}
              children={
                <PasswordReset
                  cancelFunc={cancelPasswordEdit}
                  currentPassword={currentPassword}
                  newPassword={newPassword}
                  setCurrentPassword={setCurrentPassword}
                  setNewPassword={setNewPassword}
                />
              }
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default AccountSettingsDetails;
