import { lazy } from 'react';
const TransactionLayout = lazy(() => import('../TransactionLayout'));
const AdminLayout = lazy(() => import('../../../../features/admin/dashboard/AdminLayout'));
const CancelledTransactions = lazy(() => import('./CancelledTransactions'));


const CancelledTransactionManagement = () => {
  return (
    <AdminLayout title='All Transactions' children={<TransactionLayout child={<CancelledTransactions />} />} />
  )
}

export default CancelledTransactionManagement