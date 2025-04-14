import React from "react";
import CustomText from "../common/Text";
import ArrowRight from "../../assets/icons/arrow-right2.svg?react";

interface MobileNavListProps {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  >;
  text: string;
  route: string;
  onClick: (route: string) => void
}

const MobileNavList: React.FC<MobileNavListProps> = ({ Icon, text, onClick, route }) => {
  return (
    <li onClick={() => onClick(route)} className="p-2 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Icon className="w-5 h-5 text-gray-500" />
        <CustomText
          text={text}
          textType="medium"
          weightType="medium"
          extraStyle=""
        />
      </div>

      <ArrowRight className="w-4 h-4 text-gray-500" />
    </li>
  );
};

export default MobileNavList;
