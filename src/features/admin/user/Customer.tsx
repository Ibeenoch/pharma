import CustomerUser from "../../../components/admin/users/CustomerUser";
import AdminLayout from "../dashboard/AdminLayout";

const Customer = () => {
  return <AdminLayout title="User Management" children={<CustomerUser />} />;
};

export default Customer;
