import { lazy } from "react";
const CancelledOrder = lazy(() =>import("../../../components/admin/order/CancelledOrder"));
const OrderLayout = lazy(() =>import("../../../components/admin/order/OrderLayout"));
const AdminLayout = lazy(() =>import('../dashboard/AdminLayout'));


const CancelledOrderManagement = () => {
  return (
    <AdminLayout
      title="Order Management"
      children={<OrderLayout child={<CancelledOrder />} />}
    />
  );
};

export default CancelledOrderManagement;
