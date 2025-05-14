import AddProductManager from "../../../components/admin/product/AddProductManager";
import AdminLayout from "../dashboard/AdminLayout";

const AddProduct = () => {
  return <AdminLayout title="Add Product" children={<AddProductManager />} />;
};

export default AddProduct;
