import { lazy } from "react";
const GeneralSettingsManagement = lazy(() =>import("../../../components/admin/settings/general/GeneralSettingsManagement"));

const GeneralSettings = () => {
  return <GeneralSettingsManagement />;
};

export default GeneralSettings;
