import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const AccountCreated = lazy(() =>import("../features/auth/AccountCreated"));

const AccountCreatedPage = () => {
  return <PageLayout child={<AccountCreated />} />;
};

export default AccountCreatedPage;
