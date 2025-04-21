import AdminLayout from "../dashboard/AdminLayout";
import CancelledOrder from "../../../components/admin/order/CancelledOrder";
import OrderLayout from "../../../components/admin/order/OrderLayout";

const CancelledOrderManagement = () => {
  return (
    <AdminLayout
      title="Order Management"
      children={<OrderLayout child={<CancelledOrder />} />}
    />
  );
};

export default CancelledOrderManagement;
