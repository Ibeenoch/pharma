import React from "react";
import CustomText from "../common/Text";

interface CartTwoTextProps {
  leftText: string;
  rightText: string;
  showBorder?: boolean;
  borderColor?: string;
}

const CartTwoText: React.FC<CartTwoTextProps> = ({
  leftText,
  rightText,
  showBorder,
  borderColor,
}) => {
  return (
    <div
      className={`flex justify-between items-center my-2 py-2 ${
        showBorder ? `border-b` : ""
      } ${borderColor}`}
    >
      <CustomText text={leftText} textType="medium" weightType="semibold" />

      <CustomText text={rightText} textType="medium" weightType="semibold" />
    </div>
  );
};

export default CartTwoText;
