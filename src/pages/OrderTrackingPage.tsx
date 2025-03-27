import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { pageSpacing } from "../constants/appText";
import Order from "../features/order/Order";

const OrderTrackingPage = () => {
  return (
    <main className={` ${pageSpacing}`}>
      <Header />
      <Order />
      <Footer />
    </main>
  );
};

export default OrderTrackingPage;
