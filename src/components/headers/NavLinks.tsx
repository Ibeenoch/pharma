import { links } from "../../utils/listLink";
import Lists from "../common/Lists";
import SearchBar from "./SearchBar";

const NavLinks = () => {

  return (
    <div className="hidden lg:block">
      <SearchBar />

      <Lists
        lists={links}
        textType="normal"
        weightType="medium"
        extraStyle="hover:border-b-2 hover:border-amber-500 cursor-pointer"
        isFooter={false}
      />
    </div>
  );
};

export default NavLinks;
