import React from "react";
import { useNavigate } from "react-router-dom";
import { animateTransition, COMPANY_NAME } from "../../constants/appText";
import Plus from "../../assets/icons/cross-fig.svg?react";
import CustomText from "./Text";

interface CompanyLogoProps {
  textColor?: string;
  bgColor?: string;
  textSize?:
    | "medium"
    | "small"
    | "extrasmall"
    | "normal"
    | "large"
    | "extralarge"
    | "huge"
    | "superhuge";
  iconSize?: string;
  iconColor?: string;
  fontWeight?: "bold" | "medium" | "normal" | "superbold" | "thin" | "semibold";
  showText?: boolean;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({
  textColor = "text-black",
  textSize = "medium",
  iconSize,
  fontWeight = "bold",
  bgColor = "bg-white",
  showText = true,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className={`flex items-center gap-1 ${animateTransition} cursor-pointer`}
    >
      <div className={`p-2 rounded-md ${bgColor}`}>
        <Plus className={`${iconSize ? iconSize : "w-6 h-6"}`} />
      </div>
      {showText && (
        <CustomText
          text={COMPANY_NAME}
          textType={textSize}
          weightType={fontWeight}
          extraStyle={textColor}
        />
      )}
    </div>
  );
};

export default CompanyLogo;
