import CustomButton from "../common/Button";
import CustomText from "../common/Text";
import NavLinks from "../headers/NavLinks";
import companyLogo from "../../assets/icons/pharmacy.svg";
import MobileNav from "../headers/MobileNav";

const Header = () => {
  const handleLogin = () => {};
  const handleRegister = () => {};
  return (
    <header className="bg-white fixed top-0 sm:top-5 z-50 w-full sm:w-[95%] flex p-4 items-center">
      <nav className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1 cursor-pointer">
          <img
            src={companyLogo}
            alt="ChiMark Pharmacy logo"
            className="w-6 h-6"
          />
          <CustomText
            text="ChiMark Pharmacy"
            textType="medium"
            weightType="superbold"
          />
        </div>

        <NavLinks />

        <div className="hidden lg:flex items-center gap-5">
          <CustomButton
            text="Login"
            type="button"
            borderRadiusType="threecurved"
            onClick={handleLogin}
          />
          <CustomButton
            text="Register"
            type="button"
            onClick={handleRegister}
          />
        </div>

        <MobileNav />
      </nav>
    </header>
  );
};

export default Header;
