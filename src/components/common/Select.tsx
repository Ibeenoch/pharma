import { useState } from "react";

interface CustomSelectProps {
  options?: { value: string; label: string }[]; // array of label and values
  countriesOptions?: {
    name: string;
    flag: string;
  }[]; // array of label and values
  otherOptions?: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string; // additional styles
  label?: string;
  labelStyle?: string;
  Id?: string;
  required?: boolean;
  showFullWidth?: boolean;
  showborder?: boolean;
  roundedBorder?: boolean;
  borderColor?: string;
  bgColor?: string;
  errorMessage?: string;
  prefixIcon?: React.ReactNode;
  validate?: (value: string) => boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  countriesOptions,
  otherOptions,
  value,
  onChange,
  className,
  label,
  labelStyle = "default",
  Id,
  required,
  validate,
  showFullWidth = false,
  showborder = true,
  roundedBorder = false,
  bgColor = "bg-white",
  borderColor = "border-gray-300",
  prefixIcon,
  errorMessage,
}) => {
  const [isTouch, setIsTouch] = useState<boolean>(false);

  const isValid = validate ? validate(value) : true;
  const hasError = isTouch && !isValid;

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
          } p-[9px] ${showborder ? "border" : ""} ${
            roundedBorder ? "rounded-md" : ""
          } ${borderColor} ${bgColor} ${
            hasError ? "border-red-500" : ""
          } ${className} `}
        >
          {prefixIcon && <span className="pr-2">{prefixIcon}</span>}
          <select
            onBlur={() => setIsTouch(true)}
            onFocus={() => setIsTouch(false)}
            value={value}
            name={value}
            id={value}
            className={`${
              showFullWidth ? "w-full" : "w-auto"
            } text-xs bg-transparent outline-none focus-none placeholder-gray-400 ${className}`}
            onChange={(e) => onChange(e.target.value)}
            aria-label={value}
          >
            {options &&
              options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            {countriesOptions &&
              countriesOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            {otherOptions &&
              otherOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
        </div>
      </div>
      {hasError && (
        <p className="text-red-500 mt-[0.3px] text-[12px] font-medium">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CustomSelect;
