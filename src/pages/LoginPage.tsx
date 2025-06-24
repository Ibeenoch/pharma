import React from "react";

import Login from "../features/auth/Login";
import PageLayout from "../components/common/PageLayout";
interface LoginPageProps {
  redirectUrl?: string
}

const LoginPage: React.FC<LoginPageProps> = ({ redirectUrl }) => {
  return <PageLayout child={<Login redirectUrl={redirectUrl} />} />;
};

export default LoginPage;
