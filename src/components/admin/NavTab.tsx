import React from "react";
import { defaultTextColor } from "../../constants/appColor";
interface NavTabProps {
  navLists: string[];
  indexClicked: number;
  handleTabclicked: (index: number) => void;
}

const NavTab: React.FC<NavTabProps> = ({
  navLists,
  indexClicked,
  handleTabclicked,
}) => {
  return (
    <ul className="flex items-center gap-4 pl-5">
      {navLists.map((item, index) => (
        <li
          onClick={() => handleTabclicked(index)}
          className={`text-[13px] font-semibold ${
            indexClicked === index ? `${defaultTextColor}` : ""
          }  p-1 cursor-pointer`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default NavTab;
