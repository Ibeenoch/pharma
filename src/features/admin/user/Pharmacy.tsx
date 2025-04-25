import PharmacyUser from "../../../components/admin/users/PharmacyUser";
import AdminLayout from "../dashboard/AdminLayout";

const Pharmacy = () => {
  return <AdminLayout title="Manage Pharmacy" children={<PharmacyUser />} />;
};

export default Pharmacy;
