import { useEffect, useState } from "react";
import ArrowUp from "../../assets/icons/arrow-up.svg?react";

const NavHelper = () => {
  const [isVisible, setIsVisible] = useState(false);

  const navigateToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;

      setIsVisible(scrollY > screenHeight / 6);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      onClick={navigateToTop}
      className="z-50 fixed group border border-[#f4f4f4] hover:bg-gray-800 animate-bounce right-10 p-6 bottom-10 bg-black flex items-center cursor-pointer justify-center rounded-full w-8 h-8"
    >
      <div className="text-transparent stroke-white">
        <ArrowUp className="w-5 h-5 z-50 text-white group-hover:stroke-white" />
      </div>
    </div>
  );
};

export default NavHelper;
