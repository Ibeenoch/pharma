import React, { useState } from "react";
import NavTab from "../NavTab";
import { adminDefaultBgColor } from "../../../constants/appColor";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectAdmin,
  setAdminTransactionTabIndex,
} from "../../../features/admin/adminSlice";
import DateFilter from "../DateFilter";
import { transactionNavData } from "../../../utils/transactions/transactionsList";

interface TransactionLayoutProps {
  child: React.ReactNode;
}

const TransactionLayout: React.FC<TransactionLayoutProps> = ({ child }) => {
  const [started, setStarted] = useState<string>("");
  const [ended, setEnded] = useState<string>("");
  const dispatch = useAppDispatch();
  const { adminTransactiontabIndex } = useAppSelector(selectAdmin);
  const handleTransactionTabs = (index: number) => {
    dispatch(setAdminTransactionTabIndex(index));
  };
  return (
    <main className={`md:mt-12 mt-20 ${adminDefaultBgColor}`}>
      <div className="flex flex-col md:flex-row p-4 items-center justify-between">
        <NavTab
          handleTabclicked={handleTransactionTabs}
          indexClicked={adminTransactiontabIndex}
          navLists={transactionNavData}
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
        {child}
      </section>
    </main>
  );
};

export default TransactionLayout;
