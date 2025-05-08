import { lazy } from "react";
const Body = lazy(() =>import("../../../components/admin/dashboard/Body"));
const AdminLayout = lazy(() =>import("./AdminLayout"));


const Dashboard = () => {
  return <AdminLayout title="Dashboard" children={<Body />} />;
};

export default Dashboard;
