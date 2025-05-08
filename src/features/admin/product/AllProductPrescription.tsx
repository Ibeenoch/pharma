import { lazy } from "react";
const AdminLayout = lazy(() =>import('../dashboard/AdminLayout'));
const AllPrescription = lazy(() =>import("../../../components/admin/product/AllPrescription"));

const AllProductPrescription = () => {
  return <AdminLayout title="All Prescription" children={<AllPrescription />} />;
};

export default AllProductPrescription;
