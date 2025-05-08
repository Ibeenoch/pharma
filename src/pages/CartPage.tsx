import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const Cart = lazy(() =>import("../features/cart/Cart"));

const CartPage = () => {
  return <PageLayout child={<Cart />} />;
};

export default CartPage;
