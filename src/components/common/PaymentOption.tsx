import React from "react";

interface PaymentOptionProps {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  >;
  active?: boolean;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ Icon, active }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <div
        className={`p-3 border ${
          active ? "border-amber-500 " : "border-gray-200 "
        } rounded-xl`}
      >
        <Icon className="w-22 h-22" />
      </div>
    </div>
  );
};

export default PaymentOption;
