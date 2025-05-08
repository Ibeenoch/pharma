import { lazy } from 'react';
const TransactionLayout = lazy(() => import('../TransactionLayout'));
const AdminLayout = lazy(() => import('../../../../features/admin/dashboard/AdminLayout'));
const CompletedTransactions = lazy(() => import('./CompletedTransactions'));


const CompletedTransactionManagement = () => {
  return (
    <AdminLayout title='All Transactions' children={<TransactionLayout child={<CompletedTransactions />} />} />
  )
}

export default CompletedTransactionManagement