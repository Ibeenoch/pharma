import { lazy } from "react";
const AllOrder = lazy(() => import("./AllOrder"));


const CompletedOrder = () => {
  return <AllOrder whichType="Delivered" />;
};

export default CompletedOrder;
