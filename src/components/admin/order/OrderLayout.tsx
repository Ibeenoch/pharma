import React, { useState } from "react";
import { adminDefaultBgColor } from "../../../constants/appColor";

import DateFilter from "../DateFilter";

interface OrderLayoutProps {
  child: React.ReactNode;
}
const OrderLayout: React.FC<OrderLayoutProps> = ({ child }) => {
  const [started, setStarted] = useState<string>("");
  const [ended, setEnded] = useState<string>("");

  return (
    <main className={`md:mt-12 mt-20 ${adminDefaultBgColor}`}>
      <div className="flex flex-col md:flex-row p-4 items-center justify-between">
        <div></div>

        <DateFilter
          applyCallback={() => {}}
          ended={ended}
          started={started}
          setEnded={setEnded}
          setStarted={setStarted}
        />
      </div>

      <section className="my-3">{child}</section>
    </main>
  );
};

export default OrderLayout;
