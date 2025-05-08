import { lazy } from "react";
const AllOrder = lazy(() => import("./AllOrder"));


const PendingOrder = () => {
  return <AllOrder whichType="Processing" />;
};

export default PendingOrder;
