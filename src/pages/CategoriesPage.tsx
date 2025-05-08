import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const Categories = lazy(() =>import("../features/product/Categories"));

const CategoriesPage = () => {
  return <PageLayout child={<Categories />} />;
};

export default CategoriesPage;
