import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { pageSpacing } from "../constants/appText";
import Login from "../features/auth/Login";

const LoginPage = () => {
  return (
    <main className={`${pageSpacing}`}>
      <Header />
      <Login />
      <Footer />
    </main>
  );
};

export default LoginPage;
