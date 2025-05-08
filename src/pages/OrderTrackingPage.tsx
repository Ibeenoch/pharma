import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const Order = lazy(() =>import("../features/order/Order"));

const OrderTrackingPage = () => {
  return <PageLayout child={<Order />} />;
};

export default OrderTrackingPage;
