import AdminLayout from "../../../features/admin/dashboard/AdminLayout";
import CancelledOrder from "./CancelledOrder";
import OrderLayout from "./OrderLayout";

const CancelledOrderManagement = () => {
  return <AdminLayout title="Order Management" children={<OrderLayout child={<CancelledOrder />} />} />;
};

export default CancelledOrderManagement;
