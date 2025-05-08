import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const Brand = lazy(() =>import("../features/product/Brand"));

const BrandPage = () => {
  return <PageLayout child={<Brand />} />;
};

export default BrandPage;
