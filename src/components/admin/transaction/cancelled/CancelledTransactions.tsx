import { lazy } from "react";
const AllTransactions = lazy(() => import("../all/AllTransactions"));


const CancelledTransactions = () => {
  return <AllTransactions whichType="cancelled" />;
};

export default CancelledTransactions;
