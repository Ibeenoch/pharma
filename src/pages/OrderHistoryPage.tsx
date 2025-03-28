import OrderHistory from "../features/order/OrderHistory";
import PageLayout from "../components/common/PageLayout";

const OrderHistoryPage = () => {
  return <PageLayout child={<OrderHistory />} />;
};

export default OrderHistoryPage;
