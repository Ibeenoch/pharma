import AdminLayout from "../../../features/admin/dashboard/AdminLayout";
import OrderLayout from "./OrderLayout";
import OrderTabsManagement from "./OrderTabsManagement";

const OrderManagement = () => {
  return (
    <AdminLayout title="Order Management" children={<OrderLayout child={<OrderTabsManagement />} />} />
  );
};

export default OrderManagement;
