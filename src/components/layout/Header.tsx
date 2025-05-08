import { lazy, useEffect, useState } from "react";
import ShoppingCart from "../../assets/icons/cart-shopping.svg?react";
import { useNavigate } from "react-router-dom";
import { animateTransition } from "../../constants/appText";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  logoutUser,
  resetUserState,
  selectAuth,
} from "../../features/auth/authSlice";
import { selectCart } from "../../features/cart/cartSlice";
import { fetchAllProductWithoutPagination, selectproductAdmin } from "../../features/admin/product/productSlice";
import { resetShippingDetails } from "../../features/order/orderSlice";
import Love from "../../assets/icons/heart.svg?react";
const MobileNav = lazy(() =>import("../headers/MobileNav"));
const CartItems = lazy(() =>import("../home/CartItems"));
const CompanyLogo = lazy(() =>import("../common/CompanyLogo"));
const Cart = lazy(() =>import("../common/Cart"));
const WishList = lazy(() =>import("../common/WishList"));
const WishListItems = lazy(() =>import("../home/WishlistItems"));
const ProfilePics = lazy(() =>import("../headers/ProfilePics"));
const Logout = lazy(() =>import("../common/Logout"));
const NavLinks = lazy(() =>import("../headers/NavLinks"));
const CustomButton = lazy(() =>import("../common/Button"));

const Header = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showWishlist, setShowWishlist] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { user } = useAppSelector(selectAuth);
  const { cart, wishlist } = useAppSelector(selectCart);
  const { productAdmin, hasFetchAllProduct } = useAppSelector(selectproductAdmin);

    // fetch all the products from the db
    useEffect(() => {
      if(!productAdmin){
        dispatch(fetchAllProductWithoutPagination())
      };
        hasFetchAllProduct === false &&
        dispatch(fetchAllProductWithoutPagination())
    }, [hasFetchAllProduct]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
// animated the header to the top when user scrolls 
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // toggle cart and favorite card
  const displayShowCart = () => {
    setShowCart(true);
    setShowWishlist(false);
  };
  const displayShowWishlist = () => {
    setShowWishlist(true);
    setShowCart(false);
  };
  const hideShowCart = () => setShowCart(false);
  const hideShowWishList = () => setShowWishlist(false);
// navigate to the login or resgister page or logout
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => dispatch(resetUserState()))
      .then(() => dispatch(resetShippingDetails()))
      .then(() => navigate("/login"));
  };
  // handle if the user should go to their profile page or dashboard depending on their role
 
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
              <Logout iconColor="text-red-500" textColor="text-red-500" handleLogout={handleLogout} />
              <ProfilePics navigate={navigate} user={user} />
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
