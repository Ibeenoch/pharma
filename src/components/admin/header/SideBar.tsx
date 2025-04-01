import NavIcons from "./NavIcons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectAdmin,
  setShouldShowSubTitle,
  setSideBarIndex,
} from "../../../features/admin/adminSlice";
import CompanyLogo from "../../common/CompanyLogo";
import React, { useEffect, useState } from "react";
import { animateTransition } from "../../../constants/appText";

interface SideBarProps {
  shouldMinimize: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ shouldMinimize }) => {
  const [toggleSideBar, settoggleSideBar] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sideBarIndex, shouldShowSubTitle } = useAppSelector(selectAdmin);

  useEffect(() => {
    dispatch(setShouldShowSubTitle(!shouldShowSubTitle));
    console.log("toggleSideBar ", toggleSideBar, sideBarIndex);
  }, [toggleSideBar]);

  const handleIndexClicked = (index: number) => {
    settoggleSideBar(!toggleSideBar);
    dispatch(setSideBarIndex(index));

    switch (index) {
      case 0:
        navigate("/admin/dashboard");
        break;
      case 1:
        navigate("/admin/users");
        break;
      case 2:
        navigate("/admin/product");
        break;
      case 3:
        navigate("/admin/order");
        break;
      default:
        navigate("/admin/dashboard");
        break;
    }
  };
  return (
    <aside
      className={`fixed left-0 hidden md:block ${animateTransition} ${
        shouldMinimize ? "md:w-[5%]" : "md:w-[15%]"
      } top-0 h-full bg-black  z-50`}
    >
      <div className={`mx-auto flex flex-col pb-5 items-center  pt-7 `}>
        <CompanyLogo
          fontWeight="normal"
          textSize="normal"
          textColor="text-white"
          iconSize="w-5 h-5 text-amber-500"
          showText={!shouldMinimize}
        />
      </div>

      <div className={`h-full pb-24`}>
        <NavIcons
          indexClicked={sideBarIndex}
          handleIndexClicked={handleIndexClicked}
          shouldMinimize={shouldMinimize}
        />
      </div>
    </aside>
  );
};

export default SideBar;
