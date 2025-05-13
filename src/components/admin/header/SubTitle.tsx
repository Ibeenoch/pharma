import React, { lazy } from "react";
const CustomText = lazy(() => import("../../common/Text"));
const ArrowRight = lazy(() => import("../../../assets/icons/arrow-right2.svg?react"));
import { animateTransition } from "../../../constants/appText";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectproductAdmin,
  setProductSubTabIndex,
  setProductSubTabRoute,
} from "../../../features/admin/product/productSlice";
import { selectAuth } from "../../../features/auth/authSlice";

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
  route: string;
  typeIndex: number; // identify the title clicked through num e.g 0 for dashboard, 1 for user etc
}
const SubTitle: React.FC<SubTitleProps> = ({ Icons, text, index, route }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productSubTabIndex } = useAppSelector(selectproductAdmin);
  const { user } = useAppSelector(selectAuth);

  const handleUserTabs = (url: string, index: number, route: string) => {
    dispatch(setProductSubTabIndex(index));
    dispatch(setProductSubTabRoute(route + `/${user && user.userId}`));
    navigate(`${url}/${user && user.userId}`);
  };
  return (
    <div
      onClick={() => handleUserTabs(route, index, route)}
      className={`group pl-10 flex justify-between items-center cursor-pointer ${animateTransition}`}
    >
      <div className="flex">
        <div className="h-6 w-3 border-l-2 border-b-2 border-gray-800 rounded-bl-lg"></div>
        <div className="flex items-center gap-1 pt-3 pl-2">
          <Icons
            className={`w-4 h-4 lg:w-4 lg:h-4 ${
              text === "Pharmacist" || text === "Customer"
                ? `${
                    productSubTabIndex === index
                      ? "fill-amber-500 group-hover:fill-amber-500"
                      : "fill-white group-hover:fill-amber-500"
                  } `
                : ""
            } ${
              productSubTabIndex === index ? "text-amber-500" : "text-white"
            } group-hover:text-amber-500`}
          />
          <CustomText
            text={text}
            textType="small"
            color={
              productSubTabIndex === index ? "text-amber-500" : "text-white"
            }
            extraStyle="group-hover:text-amber-500"
          />
        </div>
      </div>
      <div className="pr-4 pt-3 pl-1 cursor-pointer">
        <ArrowRight
          className={`w-5 h-5 ${
            productSubTabIndex === index ? "text-amber-500" : "text-white"
          } group-hover:text-amber-500`}
        />
      </div>
    </div>
  );
};

export default SubTitle;
