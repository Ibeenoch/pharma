import React, { lazy } from "react";
import { adminDefaultBgColor } from "../../../constants/appColor";
const CustomText = lazy(() => import("../../common/Text"));
const NavItems = lazy(() => import("./NavItems"));



interface NavBarProps {
  title: string;
  enlarge?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ title, enlarge }) => {

  return (
    <header
      className={`fixed top-0 left-0 ${
        enlarge ? "lg:left-[5%] lg:w-[95%]" : "lg:left-[15%] lg:w-[85%]"
      } w-full z-40 ${adminDefaultBgColor} border-b border-gray-300`}
    >
      <nav
        className={`p-4 flex ${adminDefaultBgColor}  justify-between items-center`}
      >
        <div className="">
         
          <div className="hidden lg:block lg:pl-5">
            <CustomText text={title} textType="medium" weightType="bold" />
          </div>
        </div>
        <div>
          <NavItems />
        
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
