import Cart from "../features/cart/Cart";
import PageLayout from "../components/common/PageLayout";

const CartPage = () => {
  return <PageLayout child={<Cart />} />;
};

export default CartPage;
