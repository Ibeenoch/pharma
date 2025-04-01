import React, { useState } from "react";
import { adminDefaultBgColor } from "../../../constants/appColor";
import CustomText from "../../common/Text";
import NavItems from "./NavItems";
import HamburgerMenu from "../../../assets/icons/menu-align-left.svg?react";
import MobileSideBar from "./MobileSideBar";

interface NavBarProps {
  title: string;
  enlarge?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ title, enlarge }) => {
  const [showMobileSideBar, setShowMobileSideBar] = useState<boolean>(false);
  const handleShowMobileSideBar = () => {
    setShowMobileSideBar(true);
  };
  const handleHideMobileSideBar = () => {
    setShowMobileSideBar(false);
  };
  return (
    <header
      className={`fixed top-0 left-0 ${
        enlarge ? "md:left-[5%] md:w-[95%]" : "md:left-[15%] md:w-[85%]"
      } w-full z-40 ${adminDefaultBgColor} border-b border-gray-300`}
    >
      <nav
        className={`p-4 flex ${adminDefaultBgColor}  justify-between items-center`}
      >
        <div className="">
          <div onClick={handleShowMobileSideBar} className="md:hidden">
            <HamburgerMenu className="w-14 h-14 text-gray-600" />
          </div>
          <div className="hidden md:block md:pl-5">
            <CustomText text={title} textType="medium" weightType="bold" />
          </div>
        </div>
        <div>
          <NavItems />
          <div className="md:hidden">
            <MobileSideBar
              showSideBar={showMobileSideBar}
              closeFunc={handleHideMobileSideBar}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
