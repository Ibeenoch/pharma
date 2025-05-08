import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const EmailVerifySuccessful = lazy(() =>import("../features/auth/EmailVerifySuccessful"));

const EmailVerificationSuccessfulPage = () => {
  return <PageLayout child={<EmailVerifySuccessful />} />;
};

export default EmailVerificationSuccessfulPage;
