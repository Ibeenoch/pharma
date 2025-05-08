import React, { lazy } from "react";
import { pageSpacing } from "../../constants/appText";
const Footer = lazy(() => import("../layout/Footer"));
const Header = lazy(() => import("../layout/Header"));

interface PageLayoutProps {
  child: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ child }) => {
  return (
    <main className={`sm:px-8 mt-10 ${pageSpacing}`}>
      <Header />
      {child}
      <Footer />
    </main>
  );
};

export default PageLayout;
