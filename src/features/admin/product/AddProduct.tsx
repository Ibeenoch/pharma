import { lazy } from "react";
const AdminLayout = lazy(() =>import('../dashboard/AdminLayout'));
const AddProductManager = lazy(() =>import("../../../components/admin/product/AddProductManager"));

const AddProduct = () => {
  return <AdminLayout title="Add Product" children={<AddProductManager />} />;
};

export default AddProduct;
