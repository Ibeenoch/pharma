import { lazy } from "react";
const PageLayout = lazy(() =>import("../components/common/PageLayout"));
const About = lazy(() =>import("../components/others/About"));


const AboutPage = () => {
  return <PageLayout child={<About />} />;
};

export default AboutPage;
