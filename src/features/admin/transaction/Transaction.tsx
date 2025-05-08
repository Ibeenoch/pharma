import { lazy } from "react";
const AllTransaction = lazy(() =>import("../../../components/admin/transaction/all/AllTransactionManagement"));

const Transaction = () => {
  return (
    <AllTransaction />
  );
};

export default Transaction;
