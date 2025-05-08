// displays home ui
import { lazy } from "react";
import { pageSpacing } from "../constants/appText";
const Header = lazy(() =>import("../components/layout/Header"));
const Footer = lazy(() =>import("../components/layout/Footer"));
const NavHelper = lazy(() =>import("../components/common/NavHelper"));
const SearchResult = lazy(() =>import("../components/home/SearchResult"));

const SearchResultPage = () => {
  return (
    <main className={`${pageSpacing}`}>
      <Header />
      <SearchResult />
      <NavHelper />
      <Footer />
    </main>
  );
};

export default SearchResultPage;
