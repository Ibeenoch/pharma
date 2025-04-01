import ArrowUp from "../../../assets/icons/arrow-upicon.svg?react";
import ArrowDown from "../../../assets/icons/arrow-down.svg?react";
import Logout from "../../../assets/icons/logout.svg?react";
import CustomText from "../../common/Text";
import { useEffect, useState } from "react";
import { navIcons, subNavIcons } from "../../../utils/admin/dashBoardLists";
import SubTitle from "./SubTitle";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { selectAdmin } from "../../../features/admin/adminSlice";

interface NavIconsProps {
  indexClicked: number;
  handleIndexClicked: (index: number) => void;
  shouldMinimize?: boolean;
}

const NavIcons: React.FC<NavIconsProps> = ({
  indexClicked,
  handleIndexClicked,
  shouldMinimize = false,
}) => {
  const { shouldShowSubTitle } = useAppSelector(selectAdmin);

  return (
    <div className={`flex flex-col `}>
      {navIcons.map((Item, index) => (
        <div onClick={() => handleIndexClicked(index)} className={``}>
          <div
            className={`flex items-center justify-between ${
              index === indexClicked ? "border-l-3 border-amber-500" : ""
            }`}
          >
            <div
              className={`flex items-center gap-1 cursor-pointer py-2 px-4 ${
                index === indexClicked ? "" : ""
              }  `}
            >
              <div className={`p-2  rounded-full`}>
                <Item.icons
                  className={`w-5 h-5 ${
                    index === indexClicked ? "text-amber-500" : "text-white"
                  } `}
                />
              </div>
              {!shouldMinimize && (
                <CustomText
                  text={Item.text}
                  textType="normal"
                  weightType="medium"
                  color={` ${
                    index === indexClicked ? "text-amber-500" : "text-white"
                  } `}
                />
              )}
            </div>

            {!shouldMinimize && (
              <div className="pr-4">
                {shouldShowSubTitle && indexClicked === index ? (
                  <ArrowUp
                    className={`w-4 h-4 ${
                      index === indexClicked ? "text-amber-500" : "text-white"
                    }`}
                  />
                ) : (
                  <ArrowDown
                    className={`w-4 h-4 ${
                      index === indexClicked ? "text-amber-500" : "text-white"
                    }`}
                  />
                )}
              </div>
            )}
          </div>

          {indexClicked === index && shouldShowSubTitle && (
            <>
              {subNavIcons.map((subItem) => (
                <>
                  {subItem.name === Item.text &&
                    subItem.children.map((sub, i) => (
                      <SubTitle key={i} Icons={sub.icons} text={sub.text} />
                    ))}
                </>
              ))}
            </>
          )}
        </div>
      ))}

      <div className="group flex items-center gap-1 absolute bottom-5 left-8 cursor-pointer">
        <Logout className={`w-5 h-5 text-white group-hover:text-amber-500`} />
        <CustomText
          text="Log out"
          textType="normal"
          weightType="medium"
          color={` text-white group-hover:text-amber-500`}
        />
      </div>
    </div>
  );
};

export default NavIcons;
