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

const Home = () => {
  return (
    <main className="sm:px-8 sm:pt-4">
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
