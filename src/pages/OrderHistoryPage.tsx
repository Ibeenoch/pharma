import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const OrderHistory = lazy(() =>import("../features/order/OrderHistory"));

const OrderHistoryPage = () => {
  return <PageLayout child={<OrderHistory />} />;
};

export default OrderHistoryPage;
