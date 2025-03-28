import PageLayout from "../components/common/PageLayout";
import Order from "../features/order/Order";

const OrderTrackingPage = () => {
  return <PageLayout child={<Order />} />;
};

export default OrderTrackingPage;
