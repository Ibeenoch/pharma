import OrderLayout from "../../../components/admin/order/OrderLayout";
import OrderTabsManagement from "../../../components/admin/order/OrderTabsManagement";
import AdminLayout from "../dashboard/AdminLayout";


const OrderManagement = () => {
  return (
    <AdminLayout
      title="Order Management"
      children={<OrderLayout child={<OrderTabsManagement />} />}
    />
  );
};

export default OrderManagement;
