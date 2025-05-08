import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const AllProductList = lazy(() =>import("../features/product/AllProductList"));

const AllProductPage = () => {
  return <PageLayout child={<AllProductList />} />;
};

export default AllProductPage;
