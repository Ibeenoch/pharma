import React, { lazy } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectAdmin,
  setSideBarIndex,
} from "../../../features/admin/adminSlice";
import { animateTransition } from "../../../constants/appText";
import { selectAuth } from "../../../features/auth/authSlice";
import CompanyLogo from "../../common/CompanyLogo";
import NavIcons from "./NavIcons";

interface SideBarProps {
  shouldMinimize: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ shouldMinimize }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sideBarIndex } = useAppSelector(selectAdmin);
  const { user } = useAppSelector(selectAuth);

  const handleIndexClicked = (index: number) => {
    dispatch(setSideBarIndex(index));

    switch (index) {
      case 0:
        navigate(
          `/admin/dashboard/${user && user.role?.toLowerCase() === "admin" && user.userId}`
        );
        break;
    }
  };

  return (
    <aside
      className={`fixed left-0 hidden lg:block ${animateTransition} ${
        shouldMinimize ? "lg:w-[5%]" : "lg:w-[15%]"
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
