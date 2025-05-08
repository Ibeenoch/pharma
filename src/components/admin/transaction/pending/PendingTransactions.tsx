import { lazy } from "react";
const AllTransactions = lazy(() => import("../all/AllTransactions"));


const PendingTransactions = () => {
  return <AllTransactions whichType="pending" />;
};

export default PendingTransactions;
