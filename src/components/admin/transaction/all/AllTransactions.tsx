import React, { lazy, useEffect, useState } from "react";
import { lightgrayBgColor } from "../../../../constants/appColor";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  getAllOrder,
  getAllTransaction,
  getAllTransactionFilteredByDate,
  resetRefreshOrder,
  selectOrder,
  totalOrderPages,
} from "../../../../features/order/orderSlice";
import { mappedTransaction } from "../../../../utils/admin/transaction/mappedTransaction";
import { useParams } from "react-router-dom";
import { OrderPaginatedArgs } from "../../../../types/order/OrderType";
import Reset from "../../../../assets/icons/reset.svg?react";
import { TransactionDateFilterProps } from "../../../../types/payment/FlutterwavePaymentType";
import NoResult from "../../header/search/NoResult";
import TransactionsSkeleton from "../../../common/animations/TransactionsSkeleton";
import DateFilter from "../../DateFilter";
import TransactionCard from "../TransactionCard";
import Modal from "../../../common/Modal";
import TransactionDetails from "../TransactionDetails";
import CustomText from "../../../common/Text";

interface AllTransactionsProps {
  whichType?: "pending" | "cancelled" | "successful" | "failed" | "all";
}

const AllTransactions: React.FC<AllTransactionsProps> = ({
  whichType = "all",
}) => {
  const { userId } = useParams();
  const [orderpaginationProps, setOrderPaginationProps] =
    useState<OrderPaginatedArgs>({ page: 0, userId: userId ?? "" });
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [started, setStarted] = useState<string>("");
  const [ended, setEnded] = useState<string>("");
  const [pageNum, setPageNum] = useState<number>(0);
  const [resetPage, setResetPage] = useState<boolean>(false);
  const [currIndex, setCurrIndex] = useState<string>("");
  const [shippingid, setShippingId] = useState<string>("");
  const { transactions, status, orders, totalOrderPage, refreshOrder } =
    useAppSelector(selectOrder);

  const dispatch = useAppDispatch();

  const handleShowDetails = (index: string, shippingId: string) => {
    setShippingId(shippingId);
    setCurrIndex(index);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handlePageClicked = (i: number, userId: string) => {
    dispatch(resetRefreshOrder());
    setPageNum(i);
    setOrderPaginationProps({ page: i, userId: userId });
  };

  useEffect(() => {
    if (userId) {
      // refreshOrder &&
      dispatch(getAllTransaction(pageNum));
      dispatch(getAllOrder(orderpaginationProps));
      dispatch(totalOrderPages());
    }
  }, [refreshOrder, userId, resetPage]);

  let filteredOrder =
    orders && Array.isArray(orders) && orders.length > 0
      ? whichType === "all"
        ? orders
        : whichType === "pending"
        ? orders.filter((s) => s.orderStatus.toLowerCase() === "processing")
        : whichType === "cancelled"
        ? orders.filter((s) => s.orderStatus.toLowerCase() === "shipped")
        : whichType === "failed"
        ? orders.filter((s) => s.orderStatus.toLowerCase() === "cancelled")
        : orders.filter((s) => s.orderStatus.toLowerCase() === "delivered")
      : [];

  const allMappedTransaction =
    transactions && Array.isArray(transactions) && transactions.length > 0
      ? whichType === "all"
        ? mappedTransaction(transactions, orders)
        : whichType === "cancelled"
        ? mappedTransaction(transactions, orders).filter(
            (m) => m.shippingStatus.toLowerCase() === "cancelled"
          )
        : whichType === "pending"
        ? mappedTransaction(transactions, orders).filter(
            (m) => m.shippingStatus.toLowerCase() === "pending"
          )
        : mappedTransaction(transactions, orders).filter(
            (m) => m.shippingStatus.toLowerCase() === "delivered"
          )
      : [];
  const transactionPreview = transactions.find((t) => t.$id === currIndex);
  const orderPreview = filteredOrder.find(
    (t) => t.transaction.shippingId === shippingid
  );

  const handleTransactionFilter = () => {
    if (!started || !ended) return;

    if (userId) {
      setPageNum(0);
      const start = new Date(started).toISOString();
      const end = new Date(ended).toISOString();

      const data: TransactionDateFilterProps = { end, start, pageNum: 0 };
      dispatch(getAllTransactionFilteredByDate(data));
    }
  };

  return (
    <>
      {status === "loading" ? (
        <TransactionsSkeleton />
      ) : allMappedTransaction && allMappedTransaction.length > 0 ? (
        <>
          <DateFilter
            setEnded={setEnded}
            setStarted={setStarted}
            applyCallback={handleTransactionFilter}
            started={started}
            ended={ended}
          />

          {allMappedTransaction &&
          Array.isArray(allMappedTransaction) &&
          allMappedTransaction.length > 0 ? (
            <section
              className={`lg:grid grid-cols-2 p-4 my-3 gap-3  ${lightgrayBgColor} rounded-xl`}
            >
              {allMappedTransaction.map((transaction, index) => (
                <div className="relative">
                  <TransactionCard
                    key={index}
                    amount={transaction.amount}
                    customerName={transaction.customerName}
                    image={transaction.image}
                    itemQty={transaction.itemQty}
                    itemTitle={transaction.itemTitle}
                    orderDate={transaction.orderDate}
                    paymentMethod={transaction.paymentMethod}
                    textBgColor={transaction.textBgColor}
                    textColor={transaction.textColor}
                    shippingId={transaction.shippingId}
                    shippingStatus={
                      transaction.shippingStatus as
                        | "Pending"
                        | "Delivered"
                        | "Cancelled"
                    }
                    shippingType={transaction.shippingType}
                    tId={transaction.id}
                    onClick={() => {
                      allMappedTransaction &&
                        allMappedTransaction[index] &&
                        allMappedTransaction[index].id &&
                        handleShowDetails(
                          allMappedTransaction[index].id,
                          allMappedTransaction[index].shippingId
                        );
                    }}
                  />
                  {showDetails &&
                    allMappedTransaction &&
                    allMappedTransaction[index] &&
                    allMappedTransaction[index].id === currIndex && (
                      <Modal
                        isOpen={showDetails}
                        onClose={handleCloseDetails}
                        children={
                          transactionPreview &&
                          orderPreview && (
                            <TransactionDetails
                              transactions={transactionPreview}
                              order={orderPreview}
                            />
                          )
                        }
                      />
                    )}
                </div>
              ))}
            </section>
          ) : (
            <NoResult title="transaction" />
          )}
          <div className="flex items-center gap-2 my-2">
            {totalOrderPage > 1 &&
              Array.from({ length: totalOrderPage }, (_, i) => (
                <div
                  className={`${
                    pageNum === i ? "bg-black text-white" : ""
                  } border border-gray-300 rounded-lg py-2 px-3 text-[12px] flex justify-center items-center cursor-pointer hover:bg-black hover:text-white`}
                  onClick={() => {
                    userId && handlePageClicked(i, userId);
                  }}
                >
                  {i + 1}
                </div>
              ))}
          </div>
        </>
      ) : (
        <section className="flex justify-center h-screen items-center">
          <div>
            <CustomText text="No Record Found" />
            <div
              onClick={() => setResetPage(true)}
              className="flex p-2 my-4 items-center bg-amber-500/30 gap-1 rounded-md cursor-pointer w-max"
            >
              <Reset className="w-4 h-4 text-amber-500" />
              <CustomText
                text="Reset"
                textType="normal"
                weightType="medium"
                color="text-amber-500"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AllTransactions;
