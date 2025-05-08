import { lazy } from "react";
const AdminLayout = lazy(() =>import("../dashboard/AdminLayout"));
const AdminUser = lazy(() =>import("../../../components/admin/users/AdminUsers"));

const Users = () => {
  return <AdminLayout title="User Management" children={<AdminUser />} />;
};

export default Users;
