import CustomText from "../common/Text";
import Menu from "../../assets/icons/menu.svg?react";

const MobileNav = () => {
  const links = [
    "Research",
    "Treatments",
    "Innovations",
    "Patient Support",
    "Contact",
  ];

  return (
    <nav className="sm:hidden">
      <div className="p-6">
        <Menu className="w-8 h-8" />
      </div>
      <ul className="flex absolute flex-col flex-start items-center gap-4">
        {links.map((link) => (
          <li>
            <CustomText
              text={link}
              textType="normal"
              weightType="medium"
              extraStyle="hover:border-b-2 hover:border-black cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNav;
