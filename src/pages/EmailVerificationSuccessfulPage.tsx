import PageLayout from "../components/common/PageLayout";
import EmailVerifySuccessful from "../features/auth/EmailVerifySuccessful";

const EmailVerificationSuccessfulPage = () => {
  return <PageLayout child={<EmailVerifySuccessful />} />;
};

export default EmailVerificationSuccessfulPage;
