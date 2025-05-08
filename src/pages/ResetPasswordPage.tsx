import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const ResetPassword = lazy(() =>import("../features/auth/ResetPassword"));

const ResetPasswordPage = () => {
  return <PageLayout child={<ResetPassword />} />;
};

export default ResetPasswordPage;
