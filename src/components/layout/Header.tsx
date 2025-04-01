import CustomButton from "../common/Button";
import NavLinks from "../headers/NavLinks";
import ShoppingCart from "../../assets/icons/cart-shopping.svg?react";
import MobileNav from "../headers/MobileNav";
import CartItems from "../home/CartItems";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "../common/CompanyLogo";

const Header = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const navigate = useNavigate();

  const displayShowCart = () => setShowCart(true);
  const hideShowCart = () => setShowCart(false);

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <header className="bg-white fixed top-0 sm:top-5 z-50 w-full sm:w-[95%] flex p-4 items-center">
      <nav className="flex w-full items-center justify-between">
        <CompanyLogo bgColor="bg-[#f4f4f4]" />

        <NavLinks />

        <div className="hidden lg:flex lg:flex-col lg:items-center gap-5">
          <div className="hidden lg:flex items-center gap-5">
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

          <div onClick={displayShowCart} className="relative cursor-pointer">
            <ShoppingCart className="w-6 h-6" />
            <span className=" absolute p-2 w-3 h-3 top-0 right-5 flex justify-center items-center rounded-full text-white text-[8px]">
              <span className="relative flex size-[15px]">
                <span className="absolute inline-flex animate-ping h-full w-full rounded-full bg-amber-500 opacity-75">
                  {" "}
                </span>
                <span className="relative inline-flex size-[15px] rounded-full bg-amber-500 justify-center items-center">
                  0{" "}
                </span>
              </span>
            </span>
          </div>
        </div>

        <CartItems showCart={showCart} hideShowCart={hideShowCart} />

        <MobileNav />
      </nav>
    </header>
  );
};

export default Header;
