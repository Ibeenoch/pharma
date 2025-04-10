import CustomButton from "../common/Button";
import NavLinks from "../headers/NavLinks";
import ShoppingCart from "../../assets/icons/cart-shopping.svg?react";
import Logout from "../../assets/icons/logout.svg?react";
import MobileNav from "../headers/MobileNav";
import CartItems from "../home/CartItems";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "../common/CompanyLogo";
import Cart from "../common/Cart";
import Love from "../../assets/icons/heart.svg?react";
import WishList from "../common/WishList";
import { animateTransition } from "../../constants/appText";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  logoutUser,
  resetUserState,
  selectAuth,
} from "../../features/auth/authSlice";
import noprofileImage from "../../assets/images/noprofileimage.png";
import CustomText from "../common/Text";

const Header = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showWishlist, setShowWishlist] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { user } = useAppSelector(selectAuth);
  console.log("user from header navbar", user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const displayShowCart = () => setShowCart(true);
  const displayShowWishlist = () => setShowWishlist(true);
  const hideShowCart = () => setShowCart(false);

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => dispatch(resetUserState()))
      .then(() => navigate("/login"));
  };
  return (
    <header
      className={`bg-white fixed top-0 ${
        scrolled ? "sm:top-0" : "sm:top-5"
      }  ${animateTransition} z-50 w-full sm:w-[95%] flex p-4 items-center`}
    >
      <nav className="flex w-full items-center justify-between">
        <CompanyLogo bgColor="bg-[#f4f4f4]" />

        <NavLinks />

        <div className="hidden lg:flex lg:flex-col lg:items-center gap-5">
          {user && user.email ? (
            <div className="hidden lg:flex items-center gap-5">
              <div
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Logout className="w-5 h-5" />
                <CustomText
                  text="Logout"
                  textType="normal"
                  weightType="medium"
                />
              </div>
              <img
                src={noprofileImage}
                alt="login user image"
                className="w-10 h-10 rounded-full border border-gray-200 cursor-pointer"
              />
            </div>
          ) : (
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
          )}

          <div className="flex items-center gap-6">
            <WishList
              WishListIcon={Love}
              WishListItemsQty={0}
              displayShowWishList={displayShowWishlist}
            />
            <Cart
              CartIcon={ShoppingCart}
              cartItemsQty={0}
              displayShowCart={displayShowCart}
            />
          </div>
        </div>

        <CartItems showCart={showCart} hideShowCart={hideShowCart} />

        <MobileNav />
      </nav>
    </header>
  );
};

export default Header;
