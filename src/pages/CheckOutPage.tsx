import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const CheckOut = lazy(() =>import("../features/cart/CheckOut"));

const CheckOutPage = () => {
  return <PageLayout child={<CheckOut />} />;
};

export default CheckOutPage;
