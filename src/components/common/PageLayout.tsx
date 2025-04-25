import React from "react";
import { pageSpacing } from "../../constants/appText";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

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
