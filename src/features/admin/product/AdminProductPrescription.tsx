import { lazy } from "react";
const AdminLayout = lazy(() =>import('../dashboard/AdminLayout'));
const ProductPrescription = lazy(() =>import("../../../components/admin/product/ProductPrescription"));

const AdminProductPrescription = () => {
  return <AdminLayout title="Prescription" children={<ProductPrescription />} />;
};

export default AdminProductPrescription;
