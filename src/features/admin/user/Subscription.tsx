import UserSubcription from "../../../components/admin/users/UserSubcription";
import AdminLayout from "../dashboard/AdminLayout";

const Subscription = () => {
  return <AdminLayout title="Manage Subscription" children={<UserSubcription />} />;
};

export default Subscription;
