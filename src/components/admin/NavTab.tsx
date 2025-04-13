import React from "react";
import { defaultTextColor } from "../../constants/appColor";
interface NavTabProps {
  navLists: { tabName: string; route: string }[];
  indexClicked: number;
}

const NavTab: React.FC<NavTabProps> = ({ navLists, indexClicked }) => {
  return (
    <ul className="flex items-center gap-4 pl-5">
      {navLists.map((item, index) => (
        <li
          className={`text-[13px] font-semibold ${
            indexClicked === index
              ? `${defaultTextColor} border-b-2 border-amber-300`
              : ""
          }  p-1 cursor-pointer`}
        >
          {item.tabName}
        </li>
      ))}
    </ul>
  );
};

export default NavTab;
