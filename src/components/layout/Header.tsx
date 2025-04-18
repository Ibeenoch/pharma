import CustomButton from "../common/Button";
import NavLinks from "../headers/NavLinks";
import ShoppingCart from "../../assets/icons/cart-shopping.svg?react";
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
import Logout from "../common/Logout";
import { selectCart } from "../../features/cart/cartSlice";
import WishListItems from "../home/WishlistItems";

const Header = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showWishlist, setShowWishlist] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { user } = useAppSelector(selectAuth);
  const { cart, wishlist } = useAppSelector(selectCart);

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
  const hideShowWishList = () => setShowWishlist(false);

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
              <Logout handleLogout={handleLogout} />
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
              WishListItemsQty={wishlist && wishlist.length}
              displayShowWishList={
                wishlist && wishlist.length > 0 ? displayShowWishlist : () => {}
              }
            />
            <Cart
              CartIcon={ShoppingCart}
              cartItemsQty={cart && cart.length}
              displayShowCart={
                cart && cart.length > 0 ? displayShowCart : () => {}
              }
            />
          </div>
        </div>

        <CartItems
          product={cart}
          showCart={showCart}
          hideShowCart={hideShowCart}
        />

        <WishListItems
          product={wishlist}
          showwishList={showWishlist}
          hideShowwishList={hideShowWishList}
        />

        <MobileNav />
      </nav>
    </header>
  );
};

export default Header;
