import { useEffect, useState } from "react";
import { getAllTransaction,  selectOrder, totalTrasactionPages } from "../../../features/order/orderSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  paymentColumns,
} from "../../../utils/admin/dashBoardLists";
import { mappedDashboardRecentTransaction } from "../../../utils/admin/transaction/mappedTransaction";
import Table from "../../common/Table";
import CustomText from "../../common/Text";
import TableSkeleton from "../../common/animations/TableSkeleton";
import Pagination from "../../Pagination";

const RecentPayment = () => {
  const { transactions, totalTransactionPage, status } = useAppSelector(selectOrder);
    const [pageNum, setPageNum] = useState<number>(0);
    const [curPage, setCurPage] = useState<number>(0);
    
    const handlePageClicked = (i: number) => {
      setCurPage(i)
      setPageNum(i)
    };
  
  const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(totalTrasactionPages())

      if(!transactions) dispatch(getAllTransaction(pageNum));   
    }, [transactions]);

    useEffect(() => {
        if(pageNum) dispatch(getAllTransaction(pageNum));
    }, [pageNum])


  const filteredTransaction = transactions && Array.isArray(transactions) ? mappedDashboardRecentTransaction(transactions) : [];

  return (
    <div className="p-4 shadow-lg bg-white rounded-xl my-3">
      <CustomText
        text="Recent Transactions"
        textType="medium"
        weightType="semibold"
        extraStyle="my-3"
      />

    {filteredTransaction && filteredTransaction.length > 0 ? (  
      <>
      {
        status === 'loading' ? <TableSkeleton /> : (
          <>
            <Table
              columns={paymentColumns}
              data={filteredTransaction}
              tableHeaderTxtColor="text-black"
              whichTable="dashboard"
            />
            <Pagination currentPage={curPage} totalPages={totalTransactionPage} itemPerPage={10} onPageChange={(i) => handlePageClicked(i)} />
          </>
        )
      }
      </>) : (
        <div className="flex justify-center items-center h-20 text-[12px]">
          No recent transaction found.
        </div>
      )}
    </div>
  );
};

export default RecentPayment;
