import PageLayout from "../components/common/PageLayout";
import EmailVerificationPending from "../features/auth/EmailVerificationPending";

const EmailVerificationPendingPage = () => {
  return <PageLayout child={<EmailVerificationPending />} />;
};

export default EmailVerificationPendingPage;
