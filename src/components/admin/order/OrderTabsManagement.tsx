import { useState } from "react";
import NavTab from "../NavTab";
import { adminDefaultBgColor } from "../../../constants/appColor";
import { orderTabList } from "../../../utils/admin/order/orderLists";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectAdmin,
  setAdminOrderTabIndex,
} from "../../../features/admin/adminSlice";
import DateFilter from "../DateFilter";
import AllOrder from "./AllOrder";
import ActiveOrder from "./ActiveOrder";
import PendingOrder from "./PendingOrder";
import CancelledOrder from "./CancelledOrder";

const OrderTabsManagement = () => {
  const [started, setStarted] = useState<string>("");
  const [ended, setEnded] = useState<string>("");
  const dispatch = useAppDispatch();
  const { adminOrdertabIndex } = useAppSelector(selectAdmin);
  const handleOrderTabs = (index: number) => {
    dispatch(setAdminOrderTabIndex(index));
  };
  return (
    <main className={`md:mt-12 mt-20 ${adminDefaultBgColor}`}>
      <div className="flex flex-col md:flex-row p-4 items-center justify-between">
        <NavTab
          handleTabclicked={handleOrderTabs}
          indexClicked={adminOrdertabIndex}
          navLists={orderTabList}
        />

        <DateFilter
          applyCallback={() => {}}
          ended={ended}
          started={started}
          setEnded={setEnded}
          setStarted={setStarted}
        />
      </div>

      <section className="my-3">
        {adminOrdertabIndex === 0 ? (
          <AllOrder />
        ) : adminOrdertabIndex === 1 ? (
          <ActiveOrder />
        ) : adminOrdertabIndex === 2 ? (
          <PendingOrder />
        ) : adminOrdertabIndex === 3 ? (
          <CancelledOrder />
        ) : (
          <div className="flex justify-center items-center">No User Found</div>
        )}
      </section>
    </main>
  );
};

export default OrderTabsManagement;
