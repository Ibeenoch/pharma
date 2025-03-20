import CustomText from "../common/Text";
import Menu from "../../assets/icons/menu.svg?react";
import Cancel from "../../assets/icons/cancel-close.svg?react";
import ArrowRight from "../../assets/icons/arrow-right-shorttail.svg?react";
import { useState } from "react";
import CustomButton from "../common/Button";

const MobileNav = () => {
  const [ showSideBar, setShowSideBar ] = useState<boolean>(false);
  const links = [
    "Research",
    "Treatments",
    "Innovations",
    "Patient Support",
    "Contact",
  ];

  const toggleSideBarItems = () => {
    setShowSideBar(!showSideBar);
  }

  const handleLogin = (): void => {
  }

  const handleRegister = (): void => {
  }

  return (
    <nav className="lg:hidden w-full h-full p-6">
      <div className={`py-4 px-2 ${showSideBar ? 'hidden' : 'flex absolute right-5 top-2'} `}>
        <Menu onClick={toggleSideBarItems} className="w-9 h-9" />
      </div>

      <div className={`lg:hidden ${showSideBar ? 'absolute w-full h-[100vh] bg-white z-50 left-0 top-0 p-6' : 'hidden'}`}>

        <div className={`lg:hidden ${showSideBar ? 'flex justify-end pb-4 ' : 'hidden' }`}>
          <Cancel onClick={toggleSideBarItems} className="w-9 h-9" />
        </div>

        <ul className={` flex flex-col justify-start  gap-4`}>
          {links.map((link) => (
            <li className="p-2 flex justify-between items-center"> 
              <CustomText
                text={link}
                textType="normal"
                weightType="medium"
                extraStyle="hover:border-b-2 hover:border-black cursor-pointer"
              />

              <ArrowRight className="w-4 h-4" />
            </li>
          ))}
        </ul>

        <div className="lg:hidden mt-6 flex items-center gap-5">
          <CustomButton
            text="Login"
            type="button"
            borderRadiusType="threecurved"
            onClick={handleLogin}
          />
          <CustomButton
            text="Register"
            type="button"
            onClick={handleRegister}
          />
        </div>

       
      </div>
    </nav>
  );
};

export default MobileNav;
