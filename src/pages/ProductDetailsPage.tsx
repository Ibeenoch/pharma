import NavHelper from "../components/common/NavHelper";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { pageSpacing } from "../constants/appText";
import ProductDetails from "../features/product/ProductDetails";

const ProductDetailsPage = () => {
  return (
    <main className={`sm:px-8 mt-10`}>
      <Header />
      <ProductDetails />
      <NavHelper />
      <Footer />
    </main>
  );
};

export default ProductDetailsPage;
