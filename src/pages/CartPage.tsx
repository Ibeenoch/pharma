import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import NavHelper from "../components/common/NavHelper";
import Cart from "../features/cart/Cart";
import { pageSpacing } from "../constants/appText";

const CartPage = () => {
  return (
    <main className={`sm:px-8 mt-10 ${pageSpacing}`}>
      <Header />
      <Cart />
      <NavHelper />
      <Footer />
    </main>
  );
};

export default CartPage;
