import UserMessage from "../../../components/admin/users/UserMessage";
import AdminLayout from "../dashboard/AdminLayout";

const Message = () => {
  return <AdminLayout title="View Message" children={<UserMessage />} />;
};

export default Message;
