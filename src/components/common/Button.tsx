import { useState } from 'react';
import LongRightArrow from '../../assets/icons/arrow-right.svg?react';



// reuseable components
interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  borderRadiusType?: "allcurved" | 'threecurved' | 'none';
  showArrow?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
  type,
  borderRadiusType = 'none',
  showArrow= false
}) => {

  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      className={`group bg-black text-white text-md font-normal px-8 py-2 flex items-center gap-4 ${ borderRadiusType === 'threecurved' ? 'rounded-bl-3xl rounded-br-3xl rounded-tl-3xl' : borderRadiusType === 'allcurved' ? 'rounded-2xl' : '' }  hover:bg-white hover:text-black hover:border hover:border-black cursor-pointer ${className}`}
    >
      <p className='group-hover:text-black'> {text} </p>
      {
        showArrow && (
          <LongRightArrow className={`w-6 h-6 border-none fill-white  group-hover:fill-black `}  />
        )
      }
    </button>
  );
};

export default CustomButton;
