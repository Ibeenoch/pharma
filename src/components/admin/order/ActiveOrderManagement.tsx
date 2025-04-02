import AdminLayout from "../../../features/admin/dashboard/AdminLayout";
import ActiveOrder from "./ActiveOrder";

const ActiveOrderManagement = () => {
  return <AdminLayout title="Active Order" children={<ActiveOrder />} />;
};

export default ActiveOrderManagement;
