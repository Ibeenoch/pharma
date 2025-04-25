import PageLayout from "../components/common/PageLayout";
import AllProductList from "../features/product/AllProductList";

const AllProductPage = () => {
  return <PageLayout child={<AllProductList />} />;
};

export default AllProductPage;
