import AdminLayout from "../../../../features/admin/dashboard/AdminLayout";
import AccountSettingsDetails from "./AccountSettingsDetails";


const AccountSettingManagement = () => {
  return (
    <AdminLayout
      title="Account Settings"
      children={<AccountSettingsDetails />}
    />
  );
};

export default AccountSettingManagement;
