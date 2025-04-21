import AdminLayout from "../dashboard/AdminLayout";
import OrderLayout from "../../../components/admin/order/OrderLayout";
import PendingOrder from "../../../components/admin/order/PendingOrder";

const PendingOrderManagement = () => {
  return (
    <AdminLayout
      title="Pending Order Management"
      children={<OrderLayout child={<PendingOrder />} />}
    />
  );
};

export default PendingOrderManagement;
