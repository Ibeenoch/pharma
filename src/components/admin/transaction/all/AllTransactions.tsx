import { useState } from "react";
import { lightgrayBgColor } from "../../../../constants/appColor";
import { alltransactionsList } from "../../../../utils/admin/transaction/transactionList";
import TransactionCard from "../TransactionCard";
import Modal from "../../../common/Modal";
import TransactionDetails from "../TransactionDetails";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectOrder } from "../../../../features/order/orderSlice";

const AllTransactions = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [currIndex, setCurrIndex] = useState<number>(0);
  const { transactions } = useAppSelector(selectOrder);
  console.log("transactions ", transactions);
  const handleShowDetails = (index: number) => {
    setCurrIndex(index);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };
  return (
    <section
      className={`lg:grid grid-cols-2 p-4 my-3 gap-3  ${lightgrayBgColor} rounded-xl`}
    >
      {alltransactionsList.map((transaction, index) => (
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
            onClick={() => handleShowDetails(index)}
          />
          {showDetails && currIndex === index && (
            <Modal
              isOpen={showDetails}
              onClose={handleCloseDetails}
              children={<TransactionDetails id="" />}
            />
          )}
        </div>
      ))}
    </section>
  );
};

export default AllTransactions;
