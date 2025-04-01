import AdminLayout from "../../../features/admin/dashboard/AdminLayout";
import OrderTabsManagement from "./OrderTabsManagement";

const OrderManagement = () => {
  return (
    <AdminLayout title="Order Management" children={<OrderTabsManagement />} />
  );
};

export default OrderManagement;
