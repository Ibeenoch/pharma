import { adminDefaultBgColor } from "../../../constants/appColor";
import { cardLists } from "../../../utils/admin/dashBoardLists";
import BodyCard from "./BodyCard";
import InventoryPieChart from "./InventoryPieChart";
import RecentPayment from "./RecentPayment";
import SalesChart from "./SalesChart";

const Body = () => {
  return (
    <main className={`w-full p-4 md:p-0 ${adminDefaultBgColor}`}>
      {/* bg-[#329DFF] blue  bg-[#1EBFC4] cyan bg-[#FDD603] YELLOW bg-[#ed686c] red*/}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 px-3 pt-7 mt-10 overflow-x-auto">
        {cardLists.map((item, index) => (
          <BodyCard
            Icon={item.Icon}
            index={index}
            color={item.color}
            endText={item.endText}
            topText={item.topText}
            middleText={item.middleText}
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
