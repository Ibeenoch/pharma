import AdminLayout from "../../../../features/admin/dashboard/AdminLayout";
import GeneralSettingsDetails from "./GeneralSettingsDetails";

const GeneralSettingsManagement = () => {
  return (
    <AdminLayout
      title="General Settings"
      children={<GeneralSettingsDetails />}
    />
  );
};

export default GeneralSettingsManagement;
