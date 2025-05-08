import { lazy } from "react";
const PendingTransactionManagement = lazy(() =>import("../../../components/admin/transaction/pending/PendingTransactionManagement"));

const PendingTransaction = () => {
  return (
    <PendingTransactionManagement />
  );
};

export default PendingTransaction;
