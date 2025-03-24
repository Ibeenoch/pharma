import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { pageSpacing } from "../constants/appText";
import ResetPassword from "../features/auth/ResetPassword";

const ResetPasswordPage = () => {
  return (
    <main className={`${pageSpacing}`}>
      <Header />
      <ResetPassword />
      <Footer />
    </main>
  );
};

export default ResetPasswordPage;
