import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const Register = lazy(() =>import("../features/auth/Register"));

const RegisterPage = () => {
  return <PageLayout child={<Register />} />;
};

export default RegisterPage;
