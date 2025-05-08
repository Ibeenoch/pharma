import { lazy } from "react";
const AdminLayout = lazy(() =>import('../dashboard/AdminLayout'));
const OrderLayout = lazy(() =>import("../../../components/admin/order/OrderLayout"));
const CompletedOrder = lazy(() =>import("../../../components/admin/order/CompletedOrder"));

const CompletedOrderManagement = () => {
  return (
    <AdminLayout
      title="Order Delivered"
      children={<OrderLayout child={<CompletedOrder />} />}
    />
  );
};

export default CompletedOrderManagement;
