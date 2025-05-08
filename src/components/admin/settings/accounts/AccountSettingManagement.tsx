import { lazy } from "react";
const AdminLayout = lazy(() => import("../../../../features/admin/dashboard/AdminLayout"));
const AccountSettingsDetails = lazy(() => import("./AccountSettingsDetails"));

const AccountSettingManagement = () => {
  return (
    <AdminLayout
      title="Account Settings"
      children={<AccountSettingsDetails />}
    />
  );
};

export default AccountSettingManagement;
