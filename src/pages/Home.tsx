// displays home ui

import Banner from "../components/home/Banner";
import HeroSection from "../components/home/HeroSection";
import Recommendation from "../features/product/Recommendation";
import Header from "../components/layout/Header";
import Category from "../features/product/Category";

const Home = () => {
  return (
    <main className="sm:px-8 sm:py-4">
      <Header />
      <HeroSection />
      <Category />
      <Banner />
      <Recommendation />
    </main>
  );
};

export default Home;
