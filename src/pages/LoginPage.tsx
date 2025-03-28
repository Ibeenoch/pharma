import PageLayout from "../components/common/PageLayout";
import Login from "../features/auth/Login";

const LoginPage = () => {
  return <PageLayout child={<Login />} />;
};

export default LoginPage;
