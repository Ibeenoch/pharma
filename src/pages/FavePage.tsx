import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const Fave = lazy(() =>import("../features/cart/Fave"));

const FavePage = () => {
  return <PageLayout child={<Fave />} />;
};

export default FavePage;
