import { lazy } from 'react';
const PendingTransactions = lazy(() => import('./PendingTransactions'));
const AdminLayout = lazy(() => import('../../../../features/admin/dashboard/AdminLayout'));
const TransactionLayout = lazy(() => import('../TransactionLayout'));


const PendingTransactionManagement = () => {
  return (
    <AdminLayout title='All Transactions' children={<TransactionLayout child={<PendingTransactions />} />} />
  )
}

export default PendingTransactionManagement