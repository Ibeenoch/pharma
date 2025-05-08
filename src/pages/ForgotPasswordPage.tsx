import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const ForgotPassword = lazy(() =>import("../features/auth/ForgotPassword"));

const ForgotPasswordPage = () => {
  return <PageLayout child={<ForgotPassword />} />;
};

export default ForgotPasswordPage;
