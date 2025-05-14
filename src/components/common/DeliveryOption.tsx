import React from "react";
import CustomText from "./Text";

interface DeliveryOptionProps {
  img: { img: string; name: string };
  active?: boolean;
}

const DeliveryOption: React.FC<DeliveryOptionProps> = ({ img, active }) => {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer">
      <div
        className={`md:p-3 p-1 border ${
          active ? "border-amber-500 " : "border-gray-200 "
        } rounded-xl`}
      >
        <img src={img.img} alt="img" className="w-15 h-15 md:w-22 md:h-22" />
      </div>
      <CustomText text={img.name} textType="normal" weightType="semibold" />
    </div>
  );
};

export default DeliveryOption;
