import React, { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));

import Login from "../features/auth/Login";
interface LoginPageProps {
  redirectUrl?: string
}

const LoginPage: React.FC<LoginPageProps> = ({ redirectUrl }) => {
  return <PageLayout child={<Login redirectUrl={redirectUrl} />} />;
};

export default LoginPage;
