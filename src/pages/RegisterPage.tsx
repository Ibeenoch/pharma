import PageLayout from "../components/common/PageLayout";
import Register from "../features/auth/Register";

const RegisterPage = () => {
  return <PageLayout child={<Register />} />;
};

export default RegisterPage;
