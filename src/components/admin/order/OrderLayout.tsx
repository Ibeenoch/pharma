import React from "react";
import { adminDefaultBgColor } from "../../../constants/appColor";


interface OrderLayoutProps {
  child: React.ReactNode;
}
const OrderLayout: React.FC<OrderLayoutProps> = ({ child }) => {
  return (
    <main className={`md:mt-15 mt-20 ${adminDefaultBgColor}`}>

      <section className="my-3">{child}</section>
    </main>
  );
};

export default OrderLayout;
