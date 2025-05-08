import { lazy } from "react";
const AllOrder = lazy(() => import("./AllOrder"));


const OrderTabsManagement = () => {

  return (
      <AllOrder />
  );
};

export default OrderTabsManagement;
