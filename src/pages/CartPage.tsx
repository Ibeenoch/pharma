import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Cart from "../features/cart/Cart";
import { pageSpacing } from "../constants/appText";

const CartPage = () => {
  return (
    <main className={`sm:px-8 mt-10 ${pageSpacing}`}>
      <Header />
      <Cart />
      <Footer />
    </main>
  );
};

export default CartPage;
