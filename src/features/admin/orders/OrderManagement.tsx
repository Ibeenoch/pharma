import { lazy } from "react";
const AdminLayout = lazy(() =>import('../dashboard/AdminLayout'));
const OrderLayout = lazy(() =>import("../../../components/admin/order/OrderLayout"));
const OrderTabsManagement = lazy(() =>import("../../../components/admin/order/OrderTabsManagement"));

const OrderManagement = () => {
  return (
    <AdminLayout
      title="Order Management"
      children={<OrderLayout child={<OrderTabsManagement />} />}
    />
  );
};

export default OrderManagement;
