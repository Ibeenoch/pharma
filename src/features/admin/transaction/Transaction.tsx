import AdminLayout from "../dashboard/AdminLayout";
import TransactionManagement from "../../../components/admin/transaction/TransactionManagement";

const Transaction = () => {
  return (
    <AdminLayout
      title="Transactions Management"
      children={<TransactionManagement />}
    />
  );
};

export default Transaction;
