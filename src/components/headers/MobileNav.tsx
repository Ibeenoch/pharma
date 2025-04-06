import Menu from "../../assets/icons/menu.svg?react";
import Cancel from "../../assets/icons/cancel-close.svg?react";
import SearchBar from "../../assets/icons/search-alt-white.svg?react";
import ShoppingCart from "../../assets/icons/cart-shopping.svg?react";
import Home from "../../assets/icons/home2.svg?react";
import Product from "../../assets/icons/product-tag.svg?react";
import Call from "../../assets/icons/phone.svg?react";
import Drug from "../../assets/icons/product.svg?react";
import Support from "../../assets/icons/support.svg?react";
import About from "../../assets/icons/about.svg?react";
import { useState } from "react";
import CustomButton from "../common/Button";
import MobileNavList from "./MobileNavList";
import { useNavigate } from "react-router-dom";

const MobileNav = () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const navigate = useNavigate();
  const links = [
    { Icon: Home, title: "Home" },
    { Icon: Product, title: "Products" },
    { Icon: Drug, title: "Prescription" },
    { Icon: About, title: "About" },
    { Icon: Call, title: "Contact" },
    { Icon: Support, title: "Support" },
  ];

  const toggleSideBarItems = () => {
    setShowSideBar(!showSideBar);
  };

  const handleLogin = () => navigate("/login");

  const handleRegister = () => navigate("/register");

  return (
    <nav className="lg:hidden w-full h-full p-6">
      <div
        className={`py-4 px-2 ${
          showSideBar ? "hidden" : "flex absolute right-5 top-2"
        } `}
      >
        <Menu onClick={toggleSideBarItems} className="w-9 h-9" />
      </div>

      <div
        className={`lg:hidden ${
          showSideBar
            ? "absolute w-full h-[100vh] bg-white z-50 left-0 top-0 p-6"
            : "hidden"
        }`}
      >
        <div
          className={`lg:hidden ${
            showSideBar ? "flex justify-between items-center pb-4 " : "hidden"
          }`}
        >
          <div className="relative cursor-pointer">
            <ShoppingCart className="w-7 h-7" />
            <span className="bg-red-500 absolute p-3 w-4 h-4 top-0 right-6 flex justify-center items-center rounded-full text-white text-[10px]">
              0
            </span>
          </div>

          <Cancel onClick={toggleSideBarItems} className="w-8 h-8" />
        </div>

        <form className="flex items-center mb-4">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search for any Product or Brand..."
            className=" lg:hidden w-full px-4 py-2 border border-gray-300 focus:border-gray-300 outline outline-gray-300 placeholder:text-xs"
          />
          <div className="bg-gray-500 p-3 flex items-center justify-center cursor-pointer">
            <SearchBar className="stroke-white w-5 h-5" />
          </div>
        </form>

        <ul className={` flex flex-col justify-start  gap-4`}>
          {links.map((link, index) => (
            <MobileNavList key={index} Icon={link.Icon} text={link.title} />
          ))}
        </ul>

        <div className="lg:hidden mt-6 flex items-center gap-5">
          <CustomButton
            text="Login"
            type="button"
            borderRadiusType="threecurved"
            onClick={handleLogin}
            fullwidth={true}
          />
          <CustomButton
            text="Register"
            type="button"
            onClick={handleRegister}
            fullwidth={true}
          />
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;
