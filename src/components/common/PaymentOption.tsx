import React from "react";
import CustomText from "./Text";

interface PaymentOptionProps {
  Item: {
    icon: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string;
        titleId?: string;
        desc?: string;
        descId?: string;
      }
    >;
    name: string;
  };
  active?: boolean;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ Item, active }) => {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer">
      <div
        className={`p-3 border ${
          active ? "border-amber-500 " : "border-gray-200 "
        } rounded-xl`}
      >
        <Item.icon className="w-22 h-22" />
      </div>
      <CustomText text={Item.name} textType="normal" weightType="semibold" />
    </div>
  );
};

export default PaymentOption;
