import ArrowUp from "../../../assets/icons/arrow-upicon.svg?react";
import ArrowDown from "../../../assets/icons/arrow-down.svg?react";
import  Logout from "../../../assets/icons/logout.svg?react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { selectAdmin, setShouldShowSubTitle, setTitleIndex } from "../../../features/admin/adminSlice";
import { navIcons, subNavIcons } from "../../../utils/admin/dashBoardLists";
import { animateTransition } from "../../../constants/appText";
import CustomText from "../../common/Text";
import SubTitle from "./SubTitle";

interface NavIconsProps {
  indexClicked: number;
  handleIndexClicked: (index: number) => void;
  shouldMinimize?: boolean;
}

const MobileNavIcons: React.FC<NavIconsProps> = ({
  indexClicked,
  handleIndexClicked,
  shouldMinimize
}) => {
  const { shouldShowSubTitle, titleIndex } = useAppSelector(selectAdmin);
  const dispatch = useAppDispatch();

  const toggleSideBar = (index: number) => {
    dispatch(setTitleIndex(index));

    dispatch(
      setShouldShowSubTitle(titleIndex === index ? !shouldShowSubTitle : true)
    );
  };
  return (
    <div className={`flex flex-col `}>
      {navIcons.map((Item, index) => (
        <div onClick={() => handleIndexClicked(index)} className={``}>
          <div
            onClick={() => toggleSideBar(index)}
            className={`flex items-center justify-between ${
              index === indexClicked ? "border-l-3 border-amber-500" : ""
            }`}
          >
            <div
              className={`flex items-center gap-1 cursor-pointer py-2 px-4 ${
                index === indexClicked ? "" : ""
              }  `}
            >
              <div className={`p-2`}>
                <Item.icons
                  className={`w-6 h-6 lg:w-5 lg:h-5 ${
                    index === indexClicked ? "text-amber-500" : "text-white"
                  } `}
                />
              </div>
              {!shouldMinimize && (
                <CustomText
                  text={Item.text}
                  textType="medium"
                  weightType="medium"
                  color={` ${
                    index === indexClicked ? "text-amber-500" : "text-white"
                  } `}
                />
              )}
            </div>

            {!shouldMinimize && index !== 0 && (
              <div className="pr-4">
                {shouldShowSubTitle && indexClicked === index ? (
                  <ArrowUp
                    className={`w-4 h-4 ${animateTransition} ${
                      index === indexClicked ? "text-amber-500" : "text-white"
                    }`}
                  />
                ) : (
                  <ArrowDown
                    className={`w-4 h-4 ${animateTransition} ${
                      index === indexClicked ? "text-amber-500" : "text-white"
                    }`}
                  />
                )}
              </div>
            )}
          </div>

          {!shouldMinimize && indexClicked === index && shouldShowSubTitle && (
            <>
              {subNavIcons.map((subItem) => (
                <>
                  {subItem.name === Item.text &&
                    subItem.children.map((sub, i) => (
                      <SubTitle
                        typeIndex={index}
                        key={i}
                        index={i}
                        Icons={sub.icons}
                        text={sub.text}
                        route={sub.route}
                      />
                    ))}
                </>
              ))}
            </>
          )}
        </div>
      ))}

      <div className="group flex gap-4 absolute bottom-5 left-8 cursor-pointer">
        <Logout className={`w-5 h-5 text-white group-hover:text-amber-500`} />
        {!shouldMinimize && (
          <CustomText
            text="Log out"
            textType="small"
            weightType="medium"
            color={` text-white group-hover:text-amber-500`}
          />
        )}
      </div>
    </div>
  );
};

export default MobileNavIcons;
