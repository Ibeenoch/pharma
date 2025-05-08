import React, { lazy } from "react";
const CustomText = lazy(() => import("../common/Text"));


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
      <CustomText text={leftText} textType="normal" weightType="semibold" />

      <div className="flex items-center gap-1">
        <CustomText
          text="NGN"
          textType="small"
          weightType="thin"
          extraStyle="text-gray-400 mt-[0.5px]"
        />
        <CustomText text={rightText} textType="normal" weightType="semibold" />
      </div>
    </div>
  );
};

export default CartTwoText;
