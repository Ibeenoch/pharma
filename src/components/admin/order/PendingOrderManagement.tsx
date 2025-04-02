import AdminLayout from "../../../features/admin/dashboard/AdminLayout";
import PendingOrder from "./PendingOrder";

const PendingOrderManagement = () => {
  return (
    <AdminLayout title="Pending Order Management" children={<PendingOrder />} />
  );
};

export default PendingOrderManagement;
