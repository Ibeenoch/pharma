import TransactionLayout from '../TransactionLayout'
import AdminLayout from '../../../../features/admin/dashboard/AdminLayout'
import CancelledTransactions from './CancelledTransactions'

const CancelledTransactionManagement = () => {
  return (
    <AdminLayout title='All Transactions' children={<TransactionLayout child={<CancelledTransactions />} />} />
  )
}

export default CancelledTransactionManagement