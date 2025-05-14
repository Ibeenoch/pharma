import AdminLayout from "../dashboard/AdminLayout";
import AdminUser from "../../../components/admin/users/AdminUsers";

const Users = () => {
  return <AdminLayout title="User Management" children={<AdminUser />} />;
};

export default Users;
