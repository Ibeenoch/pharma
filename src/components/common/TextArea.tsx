import { useState } from "react";
import Eye from "../../assets/icons/eye-show.svg?react";
import EyeOff from "../../assets/icons/eye-off.svg?react";

interface CustomTextAreaProps {
  label?: string;
  labelStyle?: string;
  row?: number;
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
  showborder?: boolean;
  Id?: string;
  isPassword?: boolean;
  maxLength?: number;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  labelStyle = "default",
  row = 10,
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
  showborder = true,
  Id,
  isPassword = false,
  maxLength
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
          className={`block mt-3 mb-1 flex gap-1  ${
            labelStyle === "default" ? "text-sm font-bold mb-2" : labelStyle
          }`}
          htmlFor={Id}
        >
          {label}{" "}
          {required && <p className="text-xs text-amber-500 font-bold">*</p>}
        </label>
      )}
      <div className="flex items-center">
        <div
          className={`flex items-center ${
            showFullWidth ? "w-full" : "w-max"
          } p-[9px] ${roundedBorder ? "rounded-md" : ""} ${
            showborder ? "border" : "border-none"
          } ${borderColor} ${bgColor} ${
            hasError ? "border-red-500" : ""
          } ${className} `}
        >
          {prefixIcon && <span className="pr-2">{prefixIcon}</span>}
          <textarea
            rows={row}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setIsTouch(true)}
            onFocus={() => setIsTouch(false)}
            maxLength={maxLength}
            required={required}
            className={`${
              showFullWidth ? "w-full" : "w-auto"
            } text-xs bg-transparent outline-none focus-none placeholder-gray-400 resize-none ${textColor}`}
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
        <p className="text-red-500 mt-[0.3px] text-[12px] font-medium">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CustomTextArea;
