import Lists from "../common/Lists";
import SearchBar from "./SearchBar";

const NavLinks = () => {
  const links = [
    { name: "Home", route: "/" },
    { name: "Products", route: "/allProduct" },
    { name: "Prescription", route: "/" },
    { name: "About", route: "/about" },
    { name: "Contact", route: "/contact" },
    { name: "Support", route: "/" },
  ];
  return (
    <div className="hidden lg:block">
      <SearchBar />

      <Lists
        lists={links}
        textType="normal"
        weightType="medium"
        extraStyle="hover:border-b-2 hover:border-amber-500 cursor-pointer"
      />
    </div>
  );
};

export default NavLinks;
