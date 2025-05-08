import { lazy } from 'react';
const TransactionLayout = lazy(() => import('../TransactionLayout'));
const AllTransactions = lazy(() => import('./AllTransactions'));
const AdminLayout = lazy(() => import('../../../../features/admin/dashboard/AdminLayout'));

const AllTransaction = () => {
  return (
    <AdminLayout title='All Transactions' children={<TransactionLayout child={<AllTransactions />} />} />
  )
}

export default AllTransaction