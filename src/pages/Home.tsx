// displays home ui

import HeroSection from "../components/home/HeroSection";
import Header from "../components/layout/Header";

const Home = () => {
  return (
    <main className="px-8 py-2">
      <Header />
      <HeroSection />
    </main>
  );
};

export default Home;
