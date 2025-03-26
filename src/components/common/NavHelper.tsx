import ArrowUp from "../../assets/icons/arrow-up.svg?react";

const NavHelper = () => {
  const navigateToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div
      onClick={navigateToTop}
      className="fixed group border border-[#f4f4f4] hover:bg-gray-800 animate-bounce right-10 p-6 bottom-10 bg-black flex items-center cursor-pointer justify-center rounded-full w-8 h-8"
    >
      <div className="text-transparent stroke-white">
        <ArrowUp className="w-5 h-5 z-40 stroke-white group-hover:stroke-white" />
      </div>
    </div>
  );
};

export default NavHelper;
