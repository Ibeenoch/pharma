import SignOut from "../../assets/icons/logout.svg?react";
import React from "react";
import CustomText from "./Text";

interface LogoutProps {
  handleLogout: () => void;
  text?: string;
  iconColor?: string;
  textColor?: string;
}

const Logout: React.FC<LogoutProps> = ({
  handleLogout,
  text,
  iconColor,
  textColor,
}) => {
  return (
    <div
      onClick={handleLogout}
      className="flex items-center gap-2 cursor-pointer"
    >
      <SignOut className={`w-5 h-5 ${iconColor ? iconColor : ""}`} />
      <CustomText
        text={text ? text : "Logout"}
        textType="normal"
        weightType="medium"
        extraStyle={`${textColor ? textColor : ""}`}
      />
    </div>
  );
};

export default Logout;
