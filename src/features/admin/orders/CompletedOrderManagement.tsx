import AdminLayout from "../dashboard/AdminLayout";
import OrderLayout from "../../../components/admin/order/OrderLayout";
import CompletedOrder from "../../../components/admin/order/CompletedOrder";

const CompletedOrderManagement = () => {
  return (
    <AdminLayout
      title="Order Delivered"
      children={<OrderLayout child={<CompletedOrder />} />}
    />
  );
};

export default CompletedOrderManagement;
