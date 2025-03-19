// displays home ui

import HeroSection from "../components/home/HeroSection";
import Header from "../components/layout/Header";

const Home = () => {
  return (
    <main className="sm:px-8 sm:py-4">
      <Header />
      <HeroSection />
    </main>
  );
};

export default Home;
