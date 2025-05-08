import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const Contact = lazy(() =>import("../components/others/Contact"));

const ContactPage = () => {
  return <PageLayout child={<Contact />} />;
};

export default ContactPage;
