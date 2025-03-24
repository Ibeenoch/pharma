import React from "react";

interface CustomTextProps {
  textType?:
    | "extrasmall"
    | "small"
    | "normal"
    | "medium"
    | "large"
    | "extralarge"
    | "huge"
    | "superhuge";
  weightType?: "thin" | "normal" | "medium" | "semibold" | "bold" | "superbold";
  text?: string;
  color?: string;
  extraStyle?: string;
  isTwoSpanText?: boolean;
  leftText?: string;
  rightText?: string;
  rightTextFunc?: () => void;
}

const CustomText: React.FC<CustomTextProps> = ({
  textType = "normal",
  weightType = "normal",
  text,
  color = "black",
  extraStyle,
  isTwoSpanText = false,
  leftText,
  rightText,
  rightTextFunc,
}) => {
  let textWeight =
    weightType === "bold"
      ? "font-bold"
      : weightType === "normal"
      ? "font-normal"
      : weightType === "semibold"
      ? "font-semibold"
      : weightType === "medium"
      ? "font-medium"
      : weightType === "superbold"
      ? "font-black"
      : "font-light";
  let textColor =
    color === "black"
      ? "text-black"
      : color === "gray"
      ? "text-gray-500"
      : color;
  return isTwoSpanText ? (
    <div className="flex item-center gap-1">
      <p className={` ${textWeight} ${textColor} ${extraStyle}`}>{leftText}</p>
      <p
        onClick={rightTextFunc}
        className={`  ${textWeight} text-amber-500 cursor-pointer font-bold ${extraStyle}`}
      >
        {rightText}
      </p>
    </div>
  ) : textType === "extrasmall" ? (
    <p
      className={`text-[7px] sm:text-[9px]  ${textWeight} ${textColor} ${extraStyle}`}
    >
      {text}{" "}
    </p>
  ) : textType === "small" ? (
    <p
      className={`text-[9px] sm:text-[12px]  ${textWeight} ${textColor} ${extraStyle}`}
    >
      {text}{" "}
    </p>
  ) : textType === "normal" ? (
    <p
      className={`text-[10px] sm:text-[14px]  ${textWeight} ${textColor} ${extraStyle}`}
    >
      {text}{" "}
    </p>
  ) : textType === "medium" ? (
    <p
      className={`text-[14px] sm:text-[18px]  ${textWeight} ${textColor} ${extraStyle}`}
    >
      {text}{" "}
    </p>
  ) : textType === "large" ? (
    <h4
      className={`text-[24px] sm:text-[28px]  ${textWeight} ${textColor} ${extraStyle}`}
    >
      {text}{" "}
    </h4>
  ) : textType === "extralarge" ? (
    <h3
      className={`text-[30px] sm:text-[36px]  ${textWeight} ${textColor} ${extraStyle}`}
    >
      {text}{" "}
    </h3>
  ) : textType === "huge" ? (
    <h2
      className={`text-[40px] sm:text-[46px]  ${textWeight} ${textColor} ${extraStyle}`}
    >
      {text}{" "}
    </h2>
  ) : textType === "superhuge" ? (
    <h2
      className={`text-[50px] sm:text-[56px]  ${textWeight} ${textColor} ${extraStyle}`}
    >
      {text}{" "}
    </h2>
  ) : (
    <h1
      className={`text-[32px]  ${textWeight} ${textColor} ${extraStyle}`}
    ></h1>
  );
};

export default CustomText;
