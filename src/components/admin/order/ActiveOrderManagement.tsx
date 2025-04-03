import AdminLayout from "../../../features/admin/dashboard/AdminLayout";
import ActiveOrder from "./ActiveOrder";
import OrderLayout from "./OrderLayout";

const ActiveOrderManagement = () => {
  return <AdminLayout title="Active Order" children={<OrderLayout child={<ActiveOrder />} />} />;
};

export default ActiveOrderManagement;
