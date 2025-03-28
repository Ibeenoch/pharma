import LongRightArrow from "../../assets/icons/arrow-right.svg?react";
import LoadingSpinner from "../../assets/icons/circle-spinner.svg?react";

// reuseable components
interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  borderRadiusType?: "allcurved" | "threecurved" | "none";
  showArrow?: boolean;
  showIcon?: boolean;
  fullwidth?: boolean;
  BtnIcon?: React.ElementType;
  isLoading?: boolean;
  textSize?: "extrasmall" | "small" | "normal" | "large";
  weightType?: "thin" | "normal" | "medium" | 'semibold' | "bold" | "superbold";
  defaultBorderColor?: string;
  defaultBackgroundColor?: string;
  defaultTextColor?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  type,
  borderRadiusType = "none",
  showArrow = false,
  showIcon = false,
  BtnIcon,
  isLoading = false,
  fullwidth = false,
  textSize = "small",
  weightType = "normal",
  defaultBorderColor,
  defaultBackgroundColor = "default",
  defaultTextColor = "default",

}) => {
  let textWeight =
    weightType === "bold"
      ? "font-bold"
      : weightType === "semibold"
      ? "font-semibold"
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
      className={`group ${defaultBorderColor ? defaultBorderColor : ""} ${
        defaultBackgroundColor !== "default"
          ? defaultBackgroundColor
          : "bg-black hover:bg-white hover:text-black hover:border hover:border-black"
      }  ${
        defaultTextColor === "default" ? "text-white" : defaultTextColor
      } text-md font-normal ${ fullwidth ? 'w-full' : '' } px-4 md:px-8 py-2 flex justify-center items-center gap-4 ${
        borderRadiusType === "threecurved"
          ? "rounded-bl-3xl rounded-br-3xl rounded-tl-3xl"
          : borderRadiusType === "allcurved"
          ? "rounded-2xl"
          : ""
      }    cursor-pointer ${className}`}
    >
      {isLoading && <LoadingSpinner className="w-5 h-5" />}
      <p
        className={`${
          defaultTextColor === "default" ? "group-hover:text-black" : ""
        }  ${textWeight} ${
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
        {text}
      </p>
        {
          showIcon && BtnIcon && (
            <BtnIcon className={`w-6 h-6 border-none fill-white hover:fill-black  group-hover:fill-black `} />
          )
        }
      {showArrow &&  (
        <LongRightArrow
          className={`w-6 h-6 border-none fill-white  group-hover:fill-black `}
        />
      )}
    </button>
  );
};

export default CustomButton;
