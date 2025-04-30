import React, { useEffect, useState } from "react";
import { lightgrayBgColor } from "../../../../constants/appColor";
import TransactionCard from "../TransactionCard";
import Modal from "../../../common/Modal";
import TransactionDetails from "../TransactionDetails";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  getAllOrder,
  resetRefreshOrder,
  selectOrder,
  totalOrderPages,
} from "../../../../features/order/orderSlice";
import { mappedTransaction } from "../../../../utils/admin/transaction/mappedTransaction";
import TransactionsSkeleton from "../../../common/animations/TransactionsSkeleton";
import { useParams } from "react-router-dom";
import { OrderPaginatedArgs } from "../../../../types/order/OrderType";

interface AllTransactionsProps {
  whichType?: "pending" | "cancelled" | "successful" | "failed" | "all";
}

const AllTransactions: React.FC<AllTransactionsProps> = ({
  whichType = "all",
}) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [currIndex, setCurrIndex] = useState<string>("");
  const [shippingid, setShippingId] = useState<string>("");
  const { transactions, status, orders, totalOrderPage, refreshOrder } =
    useAppSelector(selectOrder);
  
  const dispatch = useAppDispatch();
  const { userId } = useParams();

  const handleShowDetails = (index: string, shippingId: string) => {
    setShippingId(shippingId);
    setCurrIndex(index);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const [orderpaginationProps, setOrderPaginationProps] =
    useState<OrderPaginatedArgs>({ page: 1, userId: userId ?? "" });

  const handlePageClicked = (i: number, userId: string) => {
    dispatch(resetRefreshOrder());
    setOrderPaginationProps({ page: i, userId: userId });
  };

  useEffect(() => {
    if (userId) {
      // refreshOrder &&
      dispatch(getAllOrder(orderpaginationProps));
      dispatch(totalOrderPages());
    }
  }, [refreshOrder, userId]);

  let filteredOrder =
    whichType === "all"
      ? orders
      : whichType === "pending"
        ? orders.filter((s) => s.orderStatus.toLowerCase() === "processing")
        : whichType === "cancelled"
          ? orders.filter((s) => s.orderStatus.toLowerCase() === "shipped")
          : whichType === "failed"
            ? orders.filter((s) => s.orderStatus.toLowerCase() === "cancelled")
            : orders.filter((s) => s.orderStatus.toLowerCase() === "delivered");

  const allMappedTransaction =
    whichType === "all"
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
            );
  const transactionPreview = transactions.find((t) => t.$id === currIndex);
  const orderPreview = filteredOrder.find(
    (t) => t.transaction.shippingId === shippingid
  );

  return (
    <>
      {status === "loading" ? (
        <TransactionsSkeleton />
      ) : (
        <>
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
          <div className="flex items-center gap-2 my-2">
            {totalOrderPage > 1 &&
              Array.from({ length: totalOrderPage }, (_, i) => (
                <div
                  className="border border-gray-300 rounded-lg py-2 px-3 text-[12px] flex justify-center items-center cursor-pointer hover:bg-black hover:text-white"
                  onClick={() => {
                    userId && handlePageClicked(i + 1, userId);
                  }}
                >
                  {i + 1}
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default AllTransactions;
