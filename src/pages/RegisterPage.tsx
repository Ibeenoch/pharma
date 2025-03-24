import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { pageSpacing } from "../constants/appText";
import Register from "../features/auth/Register";

const RegisterPage = () => {
  return (
    <main className={`${pageSpacing}`}>
      <Header />
      <Register />
      <Footer />
    </main>
  );
};

export default RegisterPage;
