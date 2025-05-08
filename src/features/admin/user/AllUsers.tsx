import { lazy } from "react";
const AdminUsers = lazy(() =>import("../../../components/admin/users/AdminUsers"));
const AdminLayout = lazy(() =>import("../dashboard/AdminLayout"));


const AllUser = () => {
  return <AdminLayout title="User Management" children={<AdminUsers />} />;
};

export default AllUser;
