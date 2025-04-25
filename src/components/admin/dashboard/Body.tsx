import { useEffect } from "react";
import { adminDefaultBgColor } from "../../../constants/appColor";
import { selectproductAdmin } from "../../../features/admin/product/productSlice";
import {
  calcualateTotalRevenue,
  getAllTransaction,
  selectOrder,
} from "../../../features/order/orderSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { cardLists } from "../../../utils/admin/dashBoardLists";
import BodyCard from "./BodyCard";
import InventoryPieChart from "./InventoryPieChart";
import RecentPayment from "./RecentPayment";
import SalesChart from "./SalesChart";
import { formatWithCommas } from "../../../utils/formatAmount";
import { getAllUser, selectAuth } from "../../../features/auth/authSlice";

const Body = () => {
  const dispatch = useAppDispatch();
  const { productAdmin } = useAppSelector(selectproductAdmin);
  const { users, refreshAllUsers } = useAppSelector(selectAuth);
  const { transactions, transaction, totalRevenue, refreshTransaction } =
    useAppSelector(selectOrder);
  console.log("all user refresh ", users, refreshAllUsers);

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
    <main className={`w-full p-4 md:p-0 ${adminDefaultBgColor}`}>
      {/* bg-[#329DFF] blue  bg-[#1EBFC4] cyan bg-[#FDD603] YELLOW bg-[#ed686c] red*/}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 px-3 pt-7 mt-10 overflow-x-auto">
        {cardLists && Array.isArray(cardLists) && cardLists.map((item, index) => (
          <BodyCard
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

      <section className="md:grid grid-cols-[60%_38%] gap-4 my-6 items-center px-4">
        <SalesChart />
        <InventoryPieChart />
      </section>
      <section className="px-4">
        <RecentPayment />
      </section>
    </main>
  );
};

export default Body;
