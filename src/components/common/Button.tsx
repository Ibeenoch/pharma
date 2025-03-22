import { useState } from "react";
import LongRightArrow from "../../assets/icons/arrow-right.svg?react";

// reuseable components
interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  borderRadiusType?: "allcurved" | "threecurved" | "none";
  showArrow?: boolean;
  textSize?: "extrasmall" | "small" | "normal" | "large";
  weightType?: "thin" | "normal" | "medium" | "bold" | "superbold";
  borderColor?: string;
  backgroundColor?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  type,
  borderRadiusType = "none",
  showArrow = false,
  textSize = "small",
  weightType = "normal",
  borderColor,
  backgroundColor = "bg-black",
}) => {
  let textWeight =
    weightType === "bold"
      ? "font-bold"
      : weightType === "normal"
      ? "font-normal"
      : weightType === "medium"
      ? "font-medium"
      : weightType === "superbold"
      ? "font-black"
      : weightType === "thin"
      ? "font-light"
      : "font-light";
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      className={`group ${borderColor ? borderColor : ""} ${
        backgroundColor !== "bg-black" ? backgroundColor : "bg-black"
      }  text-white text-md font-normal px-8 py-2 flex items-center gap-4 ${
        borderRadiusType === "threecurved"
          ? "rounded-bl-3xl rounded-br-3xl rounded-tl-3xl"
          : borderRadiusType === "allcurved"
          ? "rounded-2xl"
          : ""
      }  hover:bg-white hover:text-black hover:border hover:border-black cursor-pointer ${className}`}
    >
      <p
        className={`group-hover:text-black ${textWeight} ${
          textSize === "extrasmall"
            ? "text-[8px]"
            : textSize === "small"
            ? "text-[12px]"
            : textSize === "normal"
            ? "text-[14px]"
            : textSize === "large"
            ? "text-[18px]"
            : "text-[20px]"
        }`}
      >
        {" "}
        {text}{" "}
      </p>
      {showArrow && (
        <LongRightArrow
          className={`w-6 h-6 border-none fill-white  group-hover:fill-black `}
        />
      )}
    </button>
  );
};

export default CustomButton;
