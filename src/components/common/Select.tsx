import { useState } from "react";

interface CustomSelectProps {
  options: { value: string; label: string }[]; // array of label and values
  value: string;
  onChange: (value: string) => void;
  className?: string; // additional styles
  label?: string;
  labelStyle?: string;
  Id?: string;
  required?: boolean;
  showFullWidth?: boolean;
  borderColor?: string;
  bgColor?: string;
  errorMessage?: string;
  prefixIcon?: React.ReactNode;
  validate?: (value: string) => boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  className,
  label,
  labelStyle = "default",
  Id,
  required,
  validate,
  showFullWidth = false,
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
          {required && <p className="text-xs text-red-500 font-bold">*</p>}
        </label>
      )}
      <div className="flex items-center">
        <div
          className={`flex items-center ${
            showFullWidth ? "w-full" : "w-max"
          } p-[9px]  border ${borderColor} ${bgColor} ${
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
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
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
