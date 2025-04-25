import AccountCreated from "../features/auth/AccountCreated";
import PageLayout from "../components/common/PageLayout";

const AccountCreatedPage = () => {
  return <PageLayout child={<AccountCreated />} />;
};

export default AccountCreatedPage;
