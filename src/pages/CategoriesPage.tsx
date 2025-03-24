import NavHelper from "../components/common/NavHelper";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { pageSpacing } from "../constants/appText";
import Categories from "../features/product/Categories";

const CategoriesPage = () => {
  return (
    <main className={`${pageSpacing}`}>
      <Header />
      <Categories />
      <NavHelper />
      <Footer />
    </main>
  );
};

export default CategoriesPage;
