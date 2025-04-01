import React from "react";
import CustomText from "../../common/Text";
import ArrowRight from "../../../assets/icons/arrow-right2.svg?react";

interface SubTitleProps {
  Icons: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  >;
  text: string;
}
const SubTitle: React.FC<SubTitleProps> = ({ Icons, text }) => {
  return (
    <div className="group pl-10 flex justify-between items-center cursor-pointer">
      <div className="flex">
        <div className="h-6 w-3 border-l-2 border-b-2 border-gray-800 rounded-bl-lg"></div>
        <div className="flex items-center gap-1 pt-3 pl-2">
          <Icons className="w-4 h-5 text-white group-hover:text-amber-500" />
          <CustomText
            text={text}
            textType="small"
            color="text-white"
            extraStyle="group-hover:text-amber-500"
          />
        </div>
      </div>
      <div className="pr-4 pt-3 pl-1">
        <ArrowRight className="w-4 h-5 text-white group-hover:text-amber-500" />
      </div>
    </div>
  );
};

export default SubTitle;
