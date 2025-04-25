// displays home ui

import Banner from "../components/home/Banner";
import HeroSection from "../components/home/HeroSection";
import Recommendation from "../features/product/Recommendation";
import Header from "../components/layout/Header";
import Category from "../features/product/Category";
import Brands from "../features/product/Brands";
import HotDeals from "../features/product/HotDeals";
import DiscountBanner from "../components/home/DiscountBanner";
import TopSelling from "../features/product/TopSelling";
import Faq from "../components/home/Faq";
import Footer from "../components/layout/Footer";
import NavHelper from "../components/common/NavHelper";
import { pageSpacing } from "../constants/appText";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { getCuurentLoginUserData } from "../features/auth/authSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const getCurrentUser = () => {
    dispatch(getCuurentLoginUserData());
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <main className={`${pageSpacing}`}>
      <Header />
      <HeroSection />
      <Category />
      <Banner />
      <Recommendation />
      <HotDeals />
      <TopSelling />
      <DiscountBanner />
      <Brands />
      <Faq />
      <Footer />
      <NavHelper />
    </main>
  );
};

export default Home;
