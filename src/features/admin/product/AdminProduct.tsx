import { lazy } from "react";
const AdminLayout = lazy(() =>import('../dashboard/AdminLayout'));
const ProductManagement = lazy(() =>import("../../../components/admin/product/ProductManagement"));

const AdminProduct = () => {
  return <AdminLayout title="All Product" children={<ProductManagement />} />;
};

export default AdminProduct;
