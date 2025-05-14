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
  textColor?: string;
}

const IconAndText: React.FC<IconAndTextProps> = ({ Icon, text, fillColor, textColor }) => {
  return (
    <div className="flex items-center gap-1 cursor-pointer">
      <Icon className={`w-4 h-4 ${fillColor}`} />
      <CustomText
        text={text}
        textType="normal"
        weightType="thin"
        extraStyle=""
        color={textColor ? textColor : 'text-gray-500'}
      />
    </div>
  );
};

export default IconAndText;
