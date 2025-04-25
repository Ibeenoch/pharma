import AdminUsers from "../../../components/admin/users/AdminUsers";
import AdminLayout from "../dashboard/AdminLayout";

const UserAdmin = () => {
  return <AdminLayout title="User Management" children={<AdminUsers />} />;
};

export default UserAdmin;
