import CompletedOrder from "../../../components/admin/order/CompletedOrder";
import OrderLayout from "../../../components/admin/order/OrderLayout";
import AdminLayout from "../dashboard/AdminLayout";


const CompletedOrderManagement = () => {
  return (
    <AdminLayout
      title="Order Delivered"
      children={<OrderLayout child={<CompletedOrder />} />}
    />
  );
};

export default CompletedOrderManagement;
