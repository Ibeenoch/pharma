import Menu from "../../assets/icons/menu.svg?react";
import Cancel from "../../assets/icons/cancel-close.svg?react";
import ShoppingCart from "../../assets/icons/cart-shopping.svg?react";
import Home from "../../assets/icons/home2.svg?react";
import Product from "../../assets/icons/product-tag.svg?react";
import Call from "../../assets/icons/phone.svg?react";
import Drug from "../../assets/icons/product.svg?react";
import About from "../../assets/icons/about.svg?react";
import { useState } from "react";
import CustomButton from "../common/Button";
import MobileNavList from "./MobileNavList";
import { useNavigate } from "react-router-dom";
import WishList from "../common/WishList";
import Cart from "../common/Cart";
import Love from "../../assets/icons/heart.svg?react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  logoutUser,
  resetUserState,
  selectAuth,
} from "../../features/auth/authSlice";
import noprofileImage from "../../assets/images/noprofileimage.png";
import Logout from "../common/Logout";
import { selectCart } from "../../features/cart/cartSlice";
import SearchBar from "./SearchBar";
import ProfilePics from "./ProfilePics";

const MobileNav = () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showWishlist, setShowWishlist] = useState<boolean>(false);
  const { cart, wishlist } = useAppSelector(selectCart);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(selectAuth);
  const links = [
    { Icon: Home, title: "Home", route: "/" },
    { Icon: Product, title: "Products", route: "/allProduct" },
    { Icon: Drug, title: "Prescription", route: "/prescription" }, 
    { Icon: About, title: "About", route: "/about" },
    { Icon: Call, title: "Contact", route: "/contact" },
  ];

  const toggleSideBarItems = () => {
    setShowSideBar(!showSideBar);
  };

  const handleLogin = () => navigate("/login");

  const handleRegister = () => navigate("/register");

  const displayShowCart = () => setShowCart(true);
  const displayShowWishlist = () => setShowWishlist(true);
  const hideShowCart = () => setShowCart(false);

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => dispatch(resetUserState()))
      .then(() => navigate("/login"));
  };

  const handleRoute = (str: string) => {
    switch(str){
      default:
        navigate(`${str}`);
        break;
    }
   
  };

  return (
    <nav className="lg:hidden w-full h-full p-6">
      <div
        className={`py-4 px-2 ${
          showSideBar ? "hidden" : "flex absolute items-center gap-3 right-5 top-2"
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
          <div className="flex items-center gap-6">
            <div onClick={() => navigate("/wishlist")}>
              <WishList
                WishListIcon={Love}
                WishListItemsQty={wishlist && wishlist.length}
                displayShowWishList={displayShowWishlist}
              />
            </div>
            <div onClick={() => navigate("/cart")}>
              <Cart
                CartIcon={ShoppingCart}
                cartItemsQty={cart && cart.length}
                displayShowCart={displayShowCart}
              />
            </div>
          </div>
          <Cancel onClick={toggleSideBarItems} className="w-6 h-6" />
        </div>

        {user && user.email && (
          <div className="flex lg:hidden justify-between py-4 items-center gap-5">
            <Logout handleLogout={handleLogout} />
            <ProfilePics navigate={navigate} user={user} />
          </div>
        )}
          <SearchBar />
   
        <ul className={` flex flex-col justify-start  gap-4`}>
          {links.map((link, index) => (
            <MobileNavList
              key={index}
              Icon={link.Icon}
              text={link.title}
              route={link.route}
              onClick={() => handleRoute(link.route)}
            />
          ))}
        </ul>

        {!user.email && (
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
        )}
      </div>
    </nav>
  );
};

export default MobileNav;
