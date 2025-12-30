import { useState } from "react";
import Eye from "../../assets/icons/eye-show.svg?react";
import EyeOff from "../../assets/icons/eye-off.svg?react";
import Warning from "../../assets/icons/caution.svg?react";

interface CustomInputProps {
  label?: string;
  labelStyle?: string;
  type: "text" | "email" | "password" | "tel" | "date" | "radio" | "search";
  placeholder?: string;
  value: string;
  onChange: (value: React.SetStateAction<string>) => void;
  required?: boolean;
  ignoreEmptyTextfield?: boolean;
  showFullWidth?: boolean;
  roundedBorder?: boolean;
  showSideBtn?: boolean;
  sideBtn?: React.ReactNode;
  errorMessage?: string;
  validate?: (value: string) => boolean;
  className?: string;
  prefixIcon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  showborder?: boolean;
  Id?: string;
  isPassword?: boolean;
  disabled?: boolean;
  max?: number | undefined;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  labelStyle = "default",
  type,
  placeholder,
  value,
  onChange,
  required = false,
  ignoreEmptyTextfield,
  showFullWidth = false,
  roundedBorder = false,
  showSideBtn,
  sideBtn,
  errorMessage,
  validate,
  className = "",
  prefixIcon,
  bgColor = "bg-white",
  textColor = "text-gray-900",
  borderColor = "border-gray-300/30",
  showborder = true,
  Id,
  isPassword = false,
  disabled = false,
  max,
}) => {
  const [isTouch, setIsTouch] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isValid = validate ? validate(value) : true;
  const hasError = isTouch && !isValid;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="w-full">
      {label && (
        <label
          className={`mt-3 mb-1 flex gap-1  ${
            labelStyle === "default" ? "text-sm font-bold mb-2" : labelStyle
          }`}
          htmlFor={Id}
        >
          {label}{" "}
          {required && <p className="text-xs text-amber-500 font-bold">*</p>}
        </label>
      )}
      <div className={`flex items-center`}>
        <div
          className={`flex items-center ${
            showFullWidth ? "w-full" : "w-max"
          } p-[9px] ${roundedBorder ? "rounded-md" : ""} ${
            showborder ? "border" : "border-none"
          } ${borderColor} ${bgColor} ${
            hasError && ignoreEmptyTextfield === false ? "border-red-500" : ""
          } ${className} `}
        >
          {prefixIcon && <span className="pr-2">{prefixIcon}</span>}
          <input
            type={type === "password" && showPassword ? "text" : type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setIsTouch(true)}
            onFocus={() => setIsTouch(false)}
            disabled={disabled}
            maxLength={max}
            required={required}
            id={Id}
            className={`${
              showFullWidth ? "w-full" : "w-auto"
            } text-xs bg-transparent outline-none focus-none text-black placeholder-gray-500 ${textColor}`}
          />
          {isPassword &&
            (showPassword ? (
              <EyeOff
                className="w-4 h-4 cursor-pointer text-gray-500"
                onClick={toggleShowPassword}
              />
            ) : (
              <Eye
                className="w-4 h-4 cursor-pointer text-gray-500"
                onClick={toggleShowPassword}
              />
            ))}
        </div>
        <div className="hidden md:block">{showSideBtn && sideBtn}</div>
      </div>
      <div className="block w-[194px] md:hidden">{showSideBtn && sideBtn}</div>
      {hasError && ignoreEmptyTextfield === false && (
        <div className="pt-[0.5px] flex gap-1 item-center">
          <div className="mt-[1.8px]">
            <Warning className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-red-500 mt-[1.5px] text-[12px] font-medium">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomInput;
