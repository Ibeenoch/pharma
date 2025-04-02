import AdminLayout from "../../../features/admin/dashboard/AdminLayout";
import CancelledOrder from "./CancelledOrder";

const CancelledOrderManagement = () => {
  return <AdminLayout title="Order Management" children={<CancelledOrder />} />;
};

export default CancelledOrderManagement;
