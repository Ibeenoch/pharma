import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const Prescription = lazy(() =>import("../features/product/Prescription"));

const PrescriptionPage = () => {
  return <PageLayout child={<Prescription />} />;
};

export default PrescriptionPage;
