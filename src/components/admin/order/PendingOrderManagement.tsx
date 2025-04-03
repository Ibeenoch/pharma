import AdminLayout from "../../../features/admin/dashboard/AdminLayout";
import OrderLayout from "./OrderLayout";
import PendingOrder from "./PendingOrder";

const PendingOrderManagement = () => {
  return (
    <AdminLayout title="Pending Order Management" children={<OrderLayout child={<PendingOrder />}/>} />
  );
};

export default PendingOrderManagement;
