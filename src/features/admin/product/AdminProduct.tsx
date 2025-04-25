import ProductManagement from "../../../components/admin/product/ProductManagement";
import AdminLayout from "../dashboard/AdminLayout";

const AdminProduct = () => {
  return <AdminLayout title="All Product" children={<ProductManagement />} />;
};

export default AdminProduct;
