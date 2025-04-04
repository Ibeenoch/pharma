import TransactionLayout from '../TransactionLayout'
import AdminLayout from '../../../../features/admin/dashboard/AdminLayout'
import PendingTransactions from './PendingTransactions'

const PendingTransactionManagement = () => {
  return (
    <AdminLayout title='All Transactions' children={<TransactionLayout child={<PendingTransactions />} />} />
  )
}

export default PendingTransactionManagement