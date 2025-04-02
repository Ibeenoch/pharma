import React from "react";
import CustomText from "../../common/Text";
import ArrowRight from "../../../assets/icons/arrow-right2.svg?react";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import {
  setAdminOrderTabIndex,
  setAdminProductTabIndex,
  setAdminTransactionTabIndex,
  setAdminUserTabIndex,
} from "../../../features/admin/adminSlice";
import { animateTransition } from "../../../constants/appText";

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
  index: number;
  typeIndex: number; // identify the title clicked through num e.g 0 for dashboard, 1 for user etc
}
const SubTitle: React.FC<SubTitleProps> = ({
  Icons,
  text,
  index,
  typeIndex,
}) => {
  const dispatch = useAppDispatch();
  const handleUserTabs = (type: number, index: number) => {
    type === 1
      ? dispatch(setAdminUserTabIndex(index))
      : type === 2
      ? dispatch(setAdminProductTabIndex(index))
      : type === 3
      ? dispatch(setAdminOrderTabIndex(index))
      : type === 4
      ? dispatch(setAdminTransactionTabIndex(index))
      : "";
  };
  return (
    <div
      onClick={() => handleUserTabs(typeIndex, index)}
      className={`group pl-10 flex justify-between items-center cursor-pointer ${animateTransition}`}
    >
      <div className="flex">
        <div className="h-6 w-3 border-l-2 border-b-2 border-gray-800 rounded-bl-lg"></div>
        <div className="flex items-center gap-1 pt-3 pl-2">
          <Icons className={`w-4 h-4 lg:w-4 lg:h-4 ${text === 'Pharmacist' || text === 'Customer' ? 'fill-white group-hover:fill-amber-500' : ''} text-white group-hover:text-amber-500`} />
          <CustomText
            text={text}
            textType="small"
            color="text-white"
            extraStyle="group-hover:text-amber-500"
          />
        </div>
      </div>
      <div className="pr-4 pt-3 pl-1 cursor-pointer">
        <ArrowRight className="w-5 h-5 text-white group-hover:text-amber-500" />
      </div>
    </div>
  );
};

export default SubTitle;
