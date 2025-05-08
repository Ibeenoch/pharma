import { lazy } from "react";
const AllOrder = lazy(() => import("./AllOrder"));


const CancelledOrder = () => {
  return <AllOrder whichType="Cancelled" />;
};

export default CancelledOrder;
