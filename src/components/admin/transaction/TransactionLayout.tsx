import React from "react";
import { adminDefaultBgColor } from "../../../constants/appColor";

interface TransactionLayoutProps {
  child: React.ReactNode;
}

const TransactionLayout: React.FC<TransactionLayoutProps> = ({ child }) => {

  return (
    <main className={`md:mt-15 mt-20 ${adminDefaultBgColor}`}>
      

      <section className="my-3">{child}</section>
    </main>
  );
};

export default TransactionLayout;
