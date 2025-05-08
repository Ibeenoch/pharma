import { lazy, useEffect } from "react";
import { adminDefaultBgColor } from "../../../constants/appColor";
import { selectproductAdmin } from "../../../features/admin/product/productSlice";
import { selectOrder } from "../../../features/order/orderSlice";
import {  useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { cardLists } from "../../../utils/admin/dashBoardLists";
const BodyCard = lazy(() => import("./BodyCard"));
const InventoryPieChart = lazy(() => import("./InventoryPieChart"));
const RecentPayment = lazy(() => import("./RecentPayment"));
const SalesChart = lazy(() => import("./SalesChart"));
import { formatWithCommas } from "../../../utils/formatAmount";
import {  selectAuth } from "../../../features/auth/authSlice";
import { setSideBarIndex } from "../../../features/admin/adminSlice";

const Body = () => {
  const { productAdmin } = useAppSelector(selectproductAdmin);
  const { users,  } = useAppSelector(selectAuth);
  const {  totalRevenue,  } =
    useAppSelector(selectOrder);
  const dispatch = useAppDispatch();

      useEffect(() => {
          dispatch(setSideBarIndex(0));
      }, [])
    
  const middletext = (word: string, num: number): string => {
    switch (num) {
      case 0:
        return `${formatWithCommas(productAdmin && productAdmin.length)}`;
        break;
      case 1:
        return `₦${formatWithCommas(totalRevenue)}`;
        break;
      case 2:
        return `${formatWithCommas(users && users.length)}`;
        break;
      default:
        return word;
    }
  };
  return (
    <main className={`w-full p-0 lg:p-4 md:p-0 ${adminDefaultBgColor}`}>
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 md:px-3 pt-7 mt-10 overflow-x-auto">
        {cardLists && Array.isArray(cardLists) && cardLists.map((item, index) => (
          <BodyCard
            key={index}
            Icon={item.Icon}
            index={index}
            color={item.color}
            endText={item.endText}
            topText={item.topText}
            middleText={middletext(item.middleText, index)}
            textcolor={item.textColor}
          />
        ))}
      </div>

      <section className="md:grid md:grid-cols-[55%_45%] lg:grid-cols-[60%_38%] md:gap-2 lg:gap-4 my-6 items-center px-2">
        <SalesChart />
        <InventoryPieChart />
      </section>
      <section className="lg:px-4">
        <RecentPayment />
      </section>
    </main>
  );
};

export default Body;
