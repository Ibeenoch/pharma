import { lazy } from "react";
const ArrowUp = lazy(() => import("../../../assets/icons/arrow-upicon.svg?react"));
const ArrowDown = lazy(() => import("../../../assets/icons/arrow-down.svg?react"));
const Logout = lazy(() => import("../../../assets/icons/logout.svg?react"));
const CustomText = lazy(() => import("../../common/Text"));
const SubTitle = lazy(() => import("./SubTitle"));
import { navIcons, subNavIcons } from "../../../utils/admin/dashBoardLists";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectAdmin,
  setShouldShowSubTitle,
  setTitleIndex,
} from "../../../features/admin/adminSlice";
import { animateTransition } from "../../../constants/appText";
import { logoutUser, resetUserState } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

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
  const { shouldShowSubTitle, titleIndex } = useAppSelector(selectAdmin);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toggleSideBar = (index: number) => {
    dispatch(setTitleIndex(index));

    dispatch(
      setShouldShowSubTitle(titleIndex === index ? !shouldShowSubTitle : true)
    );
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => dispatch(resetUserState()))
      .then(() => navigate("/login"));
  };

  return (
    <div className={`flex flex-col `}>
      {navIcons.map((Item, index) => (
        <div key={index} onClick={() => handleIndexClicked(index)} className={``}>
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
                  className={`w-8 h-8 lg:w-5 lg:h-5 ${
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

      <div
        onClick={handleLogout}
        className="group flex  gap-2 absolute bottom-5 left-8 cursor-pointer"
      >
        <Logout className={`w-5 h-5 text-red-500 group-hover:text-amber-500`} />
        {!shouldMinimize && (
          <CustomText
            text="Sign out"
            textType="normal"
            weightType="medium"
            color={` text-red-500 group-hover:text-amber-500`}
          />
        )}
      </div>
    </div>
  );
};

export default NavIcons;
