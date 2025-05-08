import { lazy } from "react";
const CancelledTransactionManagement = lazy(() =>import("../../../components/admin/transaction/cancelled/CancelledTransactionManagement"));

const CancelledTransaction = () => {
  return (
    <CancelledTransactionManagement />
  );
};

export default CancelledTransaction;
