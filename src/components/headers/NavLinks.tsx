import { lazy } from "react";
import { links } from "../../utils/listLink";
const Lists = lazy(() => import("../common/Lists"));
const SearchBar = lazy(() => import("./SearchBar"));

const NavLinks = () => {

  return (
    <div className="hidden lg:block">
      <SearchBar />

      <Lists
        lists={links}
        textType="normal"
        weightType="semibold"
        extraStyle="hover:border-b-2 hover:border-amber-500 cursor-pointer"
        isFooter={false}
      />
    </div>
  );
};

export default NavLinks;
