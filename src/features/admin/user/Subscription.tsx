import { lazy } from "react";
const AdminLayout = lazy(() =>import("../dashboard/AdminLayout"));
const UserSubcription = lazy(() =>import("../../../components/admin/users/UserSubcription"));

const Subscription = () => {
  return <AdminLayout title="Manage Subscription" children={<UserSubcription />} />;
};

export default Subscription;
