// displays home ui
import { lazy, useEffect } from "react";
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
import { pageSpacing } from "../constants/appText";
import { useAppDispatch, useAppSelector,  } from "../hooks/reduxHooks";
import { getCuurentLoginUserData, setNavIndexLink,  } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { fetchAllProductWithoutPagination, fetchAllUserProduct, selectproductAdmin } from "../features/admin/product/productSlice";
import { links } from "../utils/listLink";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productAdmin, hasFetchAllProduct } = useAppSelector(selectproductAdmin);

  const getCurrentUser = () => {
    dispatch(getCuurentLoginUserData());
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if(!productAdmin){
      dispatch(fetchAllProductWithoutPagination())
    };
      hasFetchAllProduct === false &&
      dispatch(fetchAllProductWithoutPagination());
  }, [hasFetchAllProduct]);
  console.log('productAdmin ', productAdmin);

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
      <Category navigate={navigate} productAdmin={productAdmin} />
      <Banner />
      <Recommendation navigate={navigate} productAdmin={productAdmin} />
      <HotDeals  navigate={navigate} productAdmin={productAdmin} />
      <TopSelling navigate={navigate} productAdmin={productAdmin} />
      <DiscountBanner />
      <Brands navigate={navigate} />
      <Faq />
      <Footer />
      <NavHelper />
    </main>
  );
};

export default Home;
