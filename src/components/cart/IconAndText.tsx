import React from "react";
import CustomText from "../common/Text";

interface IconAndTextProps {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  >;
  text: string;
  fillColor?: string;
}

const IconAndText: React.FC<IconAndTextProps> = ({ Icon, text, fillColor }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <Icon className={`w-7 h-7 stroke-red-500 ${fillColor}`} />
      <CustomText
        text={text}
        textType="normal"
        weightType="thin"
        extraStyle="text-gray-500"
      />
    </div>
  );
};

export default IconAndText;
