import AdminLayout from "../../../../features/admin/dashboard/AdminLayout"
import TransactionLayout from "../TransactionLayout"
import CompletedTransactions from "./CompletedTransactions"


const CompletedTransactionManagement = () => {
  return (
    <AdminLayout title='All Transactions' children={<TransactionLayout child={<CompletedTransactions />} />} />
  )
}

export default CompletedTransactionManagement