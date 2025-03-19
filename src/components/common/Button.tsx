import React from "react";

// reuseable components
interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  type,
}) => {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      className={`bg-black text-white text-xs font-md px-8 py-4 rounded  ${className}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;
