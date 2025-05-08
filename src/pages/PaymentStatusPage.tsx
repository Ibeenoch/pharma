import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const PaymentStatus = lazy(() =>import("../features/cart/PaymentStatus"));

const PaymentStatusPage = () => {
  return <PageLayout child={<PaymentStatus />} />;
};

export default PaymentStatusPage;
