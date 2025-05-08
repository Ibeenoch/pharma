import { lazy } from "react";
const AdminLayout = lazy(() =>import("../dashboard/AdminLayout"));
const UserMessage = lazy(() =>import("../../../components/admin/users/UserMessage"));

const Message = () => {
  return <AdminLayout title="View Message" children={<UserMessage />} />;
};

export default Message;
