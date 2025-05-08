import { lazy } from "react";
const AllTransactions = lazy(() => import("../all/AllTransactions"));


const CompletedTransactions = () => {
  return <AllTransactions whichType="successful" />;
};

export default CompletedTransactions;
