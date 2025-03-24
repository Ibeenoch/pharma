import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { pageSpacing } from "../constants/appText";
import ForgotPassword from "../features/auth/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <main className={`${pageSpacing}`}>
      <Header />
      <ForgotPassword />
      <Footer />
    </main>
  );
};

export default ForgotPasswordPage;
