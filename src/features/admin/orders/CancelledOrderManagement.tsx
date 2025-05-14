import CancelledOrder from "../../../components/admin/order/CancelledOrder";
import OrderLayout from "../../../components/admin/order/OrderLayout";
import AdminLayout from "../dashboard/AdminLayout";


const CancelledOrderManagement = () => {
  return (
    <AdminLayout
      title="Order Management"
      children={<OrderLayout child={<CancelledOrder />} />}
    />
  );
};

export default CancelledOrderManagement;
