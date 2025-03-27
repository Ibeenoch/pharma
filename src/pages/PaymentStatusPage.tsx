import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { pageSpacing } from "../constants/appText";
import PaymentStatus from "../features/cart/PaymentStatus";

const PaymentStatusPage = () => {
  return (
    <main className={` ${pageSpacing}`}>
      <Header />
      <PaymentStatus />
      <Footer />
    </main>
  );
};

export default PaymentStatusPage;
