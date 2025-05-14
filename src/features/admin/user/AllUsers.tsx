import AdminUsers from "../../../components/admin/users/AdminUsers";
import AdminLayout from "../dashboard/AdminLayout";

const AllUser = () => {
  return <AdminLayout title="User Management" children={<AdminUsers />} />;
};

export default AllUser;
