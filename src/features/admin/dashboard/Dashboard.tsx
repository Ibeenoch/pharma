import Body from "../../../components/admin/dashboard/Body";
import AdminLayout from "./AdminLayout";

const Dashboard = () => {
  return <AdminLayout title="Dashboard" children={<Body />} />;
};

export default Dashboard;
