import { lazy } from "react";
const AdminLayout = lazy(() =>import('../dashboard/AdminLayout'));
const OrderLayout = lazy(() =>import("../../../components/admin/order/OrderLayout"));
const PendingOrder = lazy(() =>import("../../../components/admin/order/PendingOrder"));

const PendingOrderManagement = () => {
  return (
    <AdminLayout
      title="Pending Order Management"
      children={<OrderLayout child={<PendingOrder />} />}
    />
  );
};

export default PendingOrderManagement;
