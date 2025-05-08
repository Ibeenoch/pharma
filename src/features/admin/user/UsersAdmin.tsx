import { lazy } from "react";
const AdminLayout = lazy(() =>import("../dashboard/AdminLayout"));
const AdminUsers = lazy(() =>import("../../../components/admin/users/AdminUsers"));

const UserAdmin = () => {
  return <AdminLayout title="User Management" children={<AdminUsers />} />;
};

export default UserAdmin;
