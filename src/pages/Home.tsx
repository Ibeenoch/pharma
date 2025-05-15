// displays home ui
import { lazy, useEffect } from "react";
import { pageSpacing } from "../constants/appText";
import { useAppDispatch, useAppSelector,  } from "../hooks/reduxHooks";
import { getCuurentLoginUserData, setNavIndexLink,  } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { fetchAllProductWithoutPagination, selectproductAdmin } from "../features/admin/product/productSlice";
import { links } from "../utils/listLink";
const Partners = lazy(() =>import("../components/home/Partners"));
const Testimony = lazy(() =>import("../components/home/Testimony"));
const Banner = lazy(() =>import("../components/home/Banner"));
const HeroSection = lazy(() =>import("../components/home/HeroSection"));
const Recommendation = lazy(() =>import("../features/product/Recommendation"));
const Header = lazy(() =>import("../components/layout/Header"));
const Category = lazy(() =>import("../features/product/Category"));
const Brands = lazy(() =>import("../features/product/Brands"));
const HotDeals = lazy(() =>import("../features/product/HotDeals"));
const DiscountBanner = lazy(() =>import("../components/home/DiscountBanner"));
const TopSelling = lazy(() =>import("../features/product/TopSelling"));
const Faq = lazy(() =>import("../components/home/Faq"));
const Footer = lazy(() =>import("../components/layout/Footer"));
const NavHelper = lazy(() =>import("../components/common/NavHelper"));

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { allProduct, hasFetchAllProduct } = useAppSelector(selectproductAdmin);

  const getCurrentUser = () => {
    dispatch(getCuurentLoginUserData());
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if(!allProduct || allProduct.length < 1) dispatch(fetchAllProductWithoutPagination());
      hasFetchAllProduct === false &&
      dispatch(fetchAllProductWithoutPagination());
  }, [hasFetchAllProduct]);

  useEffect(() => {
      // when the user visit the page move the page to the top
      window.scrollTo(0,0);
      // set the correct navbar active text
      dispatch(setNavIndexLink({ name: links[0].name, index: 0 }));
    },[])

 

  return (
    <main className={`${pageSpacing}`}>
      <Header />
      <HeroSection navigate={navigate} />
      <Category navigate={navigate} allProduct={allProduct} />
      <Banner />
      <Recommendation navigate={navigate} allProduct={allProduct}  />
      <HotDeals  navigate={navigate} allProduct={allProduct} />
      <TopSelling navigate={navigate} allProduct={allProduct} />
      <DiscountBanner />
      <Brands navigate={navigate} />
      <Testimony />
      <Partners />
      <Faq />
      <Footer />
      <NavHelper />
    </main>
  );
};

export default Home;
