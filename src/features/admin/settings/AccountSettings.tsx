import { lazy } from "react";
const AccountSettingManagement = lazy(() =>import("../../../components/admin/settings/accounts/AccountSettingManagement"));

const AccountSettings = () => {
  return <AccountSettingManagement />;
};

export default AccountSettings;
