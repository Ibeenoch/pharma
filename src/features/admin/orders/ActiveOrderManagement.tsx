import AdminLayout from "../dashboard/AdminLayout";
import ActiveOrder from "../../../components/admin/order/ActiveOrder";
import OrderLayout from "../../../components/admin/order/OrderLayout";

const ActiveOrderManagement = () => {
  return (
    <AdminLayout
      title="Active Order"
      children={<OrderLayout child={<ActiveOrder />} />}
    />
  );
};

export default ActiveOrderManagement;
