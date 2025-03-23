import { useState } from "react";
import Eye from "../../assets/icons/eye-show.svg?react";
import EyeOff from "../../assets/icons/eye-off.svg?react";

interface CustomInputProps {
  label?: string;
  labelStyle?: string;
  type: "text" | "email" | "password" | "tel";
  placeholder?: string;
  value: string;
  onChange: (value: React.SetStateAction<string>) => void;
  required?: boolean;
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
  Id?: string;
  isPassword?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  labelStyle,
  type,
  placeholder,
  value,
  onChange,
  required = false,
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
  borderColor = "border-gray-300",
  Id,
  isPassword = false,
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
          className={`block mt-3 mb-1 flex gap-1  ${labelStyle}`}
          htmlFor={Id}
        >
          {label}{" "}
          {required && <p className="text-xs text-red-500 font-bold">*</p>}
        </label>
      )}
      <div className="flex items-center">
        <div
          className={`flex items-center ${
            showFullWidth ? "w-full" : "w-max"
          } p-[9px] ${
            roundedBorder ? "rounded-md" : ""
          } border ${borderColor} ${bgColor} ${
            hasError ? "border-red-500" : ""
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
            required={required}
            className={`${
              showFullWidth ? "w-full" : "w-auto"
            } text-xs bg-transparent outline-none focus-none placeholder-gray-400 ${textColor}`}
          />
          {isPassword &&
            (showPassword ? (
              <EyeOff
                className="w-4 h-4 cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <Eye
                className="w-4 h-4 cursor-pointer"
                onClick={toggleShowPassword}
              />
            ))}
        </div>
        {showSideBtn && sideBtn}
      </div>
      {hasError && (
        <p className="text-red-500 my-1 text-[9px]">{errorMessage}</p>
      )}
    </div>
  );
};

export default CustomInput;
