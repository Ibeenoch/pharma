import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const EmailVerificationPending = lazy(() =>import("../features/auth/EmailVerificationPending"));

const EmailVerificationPendingPage = () => {
  return <PageLayout child={<EmailVerificationPending />} />;
};

export default EmailVerificationPendingPage;
