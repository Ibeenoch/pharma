import AllPrescription from "../../../components/admin/product/AllPrescription";
import AdminLayout from "../dashboard/AdminLayout";

const AllProductPrescription = () => {
  return <AdminLayout title="All Prescription" children={<AllPrescription />} />;
};

export default AllProductPrescription;
