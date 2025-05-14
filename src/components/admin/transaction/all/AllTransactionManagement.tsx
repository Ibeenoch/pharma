import AdminLayout from "../../../../features/admin/dashboard/AdminLayout"
import TransactionLayout from "../TransactionLayout"
import AllTransactions from "./AllTransactions"

const AllTransaction = () => {
  return (
    <AdminLayout title='All Transactions' children={<TransactionLayout child={<AllTransactions />} />} />
  )
}

export default AllTransaction