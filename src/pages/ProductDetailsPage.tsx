import { lazy } from "react";
const NavHelper = lazy(() =>import("../components/common/NavHelper"));
const Footer = lazy(() =>import("../components/layout/Footer"));
const Header = lazy(() =>import("../components/layout/Header"));
const ProductDetails = lazy(() =>import("../features/product/ProductDetails"));

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
