import { lazy } from "react";
const CompletedTransactionManagement = lazy(() =>import("../../../components/admin/transaction/completed/CompletedTransactionManagement"));

const CompletedTransaction = () => {
  return (
    <CompletedTransactionManagement />
  );
};

export default CompletedTransaction;
