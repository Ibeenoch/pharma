import CustomText from "../../common/Text";
import NavItems from "./NavItems";

const NavBar = () => {
  return (
    <header className="fixed top-0 w-[85%] z-40 bg-[#fdebc7] border-b border-gray-300">
      <nav className="p-4 flex bg-[#fdebc7]  justify-between items-center">
        <CustomText text={`Dashboard`} textType="medium" weightType="bold" />
        <div>
          <NavItems />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
