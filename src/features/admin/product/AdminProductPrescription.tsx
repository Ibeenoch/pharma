import ProductPrescription from "../../../components/admin/product/ProductPrescription";
import AdminLayout from "../dashboard/AdminLayout";

const AdminProductPrescription = () => {
  return <AdminLayout title="Prescription" children={<ProductPrescription />} />;
};

export default AdminProductPrescription;
