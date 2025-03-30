import React from "react";
import { adminDefaultBgColor } from "../../../constants/appColor";
import CustomText from "../../common/Text";
import NavItems from "./NavItems";

interface NavBarProps {
  title: string;
}

const NavBar: React.FC<NavBarProps> = ({ title }) => {
  return (
    <header
      className={`fixed top-0 left-[15%]  w-[85%] z-40 ${adminDefaultBgColor} border-b border-gray-300`}
    >
      <nav
        className={`p-4 flex ${adminDefaultBgColor}  justify-between items-center`}
      >
        <CustomText text={title} textType="medium" weightType="bold" />
        <div>
          <NavItems />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
