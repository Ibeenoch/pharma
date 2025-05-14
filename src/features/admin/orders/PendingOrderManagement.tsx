import OrderLayout from "../../../components/admin/order/OrderLayout";
import PendingOrder from "../../../components/admin/order/PendingOrder";
import AdminLayout from "../dashboard/AdminLayout";


const PendingOrderManagement = () => {
  return (
    <AdminLayout
      title="Pending Order Management"
      children={<OrderLayout child={<PendingOrder />} />}
    />
  );
};

export default PendingOrderManagement;
