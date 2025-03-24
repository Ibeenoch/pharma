// displays home ui

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import NavHelper from "../components/common/NavHelper";
import { pageSpacing } from "../constants/appText";
import SearchResult from "../components/home/SearchResult";

const SearchResultPage = () => {
  return (
    <main className={`${pageSpacing}`}>
      <Header />
      <SearchResult />
      <Footer />
      <NavHelper />
    </main>
  );
};

export default SearchResultPage;
