import React from "react";
import Menu from "../../../assets/icons/about.svg?react";
import Trash from "../../../assets/icons/trash-filled.svg?react";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { deleteATransaction } from "../../../features/order/orderSlice";
import CustomText from "../../common/Text";


export interface TransactionCardProps {
  image: string;
  shippingId?: string;
  shippingType?: string;
  shippingStatus?: "Cancelled" | "Pending" | "Delivered";
  itemTitle: string;
  itemQty: string;
  amount: string;
  orderDate: string;
  customerName: string;
  paymentMethod: string;
  textColor: string;
  textBgColor: string;
  tId?: string;
  onClick: () => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  image,
  shippingId,
  shippingStatus,
  shippingType,
  itemQty,
  itemTitle,
  amount,
  tId,
  orderDate,
  customerName,
  paymentMethod,
  textBgColor,
  textColor,
  onClick,
}) => {
  const dispatch = useAppDispatch()
  const deleteTransaction = (id: string) => {
      let getConfirmation = window.confirm(`Are you sure you want to delete this transaction with id #${id} ?`);
      if(getConfirmation){
        dispatch(deleteATransaction(id))
      }
  }
  return (
    <div
      className={`p-4 rounded-xl bg-white my-3 lg:my-0 hover:bg-white/50 group`}
    >
      <div className="flex justify-between items-center pb-3 border-b border-dashed border-gray-200">
        <div className="flex items-center gap-1">
          <CustomText
            text={shippingId}
            textType="small"
            weightType="semibold"
            color={textColor}
          />
          <div className="w-1 h-1 rounded-full bg-gray-300"></div>
          <CustomText
            text={shippingType}
            textType="small"
            weightType="semibold"
            color="text-gray-300"
          />
        </div>
        <div className="flex gap-1 items-center">
          <div
            className={`py-1 px-2 flex items-center justify-center rounded-xl ${textBgColor}`}
          >
            <CustomText
              text={shippingStatus}
              color={textColor}
              textType="small"
              weightType="semibold"
            />
          </div>
          <div
            onClick={onClick}
            className={`py-1 px-2 flex items-center justify-center rounded-xl cursor-pointer`}
          >
            <Menu className={`w-4 h-4 ${textColor}`} />
          </div>
          <div
            onClick={() => tId && deleteTransaction(tId)}
            className={`py-1 flex items-center justify-center rounded-xl cursor-pointer`}
          >
            <Trash className={`w-4 h-4 ${textColor}`} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 pb-3">
        <div className="flex items-center gap-1">
          <img
            src={image}
            alt="transaction image"
            className="w-7 h-7 rounded-full"
          />
          <div>
            <CustomText
              text={itemTitle}
              textType="extrasmall"
              weightType="semibold"
            />
            <CustomText
              text={`${itemQty} x $24.00`}
              textType="extrasmall"
              color="text-gray-400"
              extraStyle="py-1"
            />
            {parseInt(itemQty) > 1 && (
              <CustomText
                text={`and ${parseInt(itemQty) - 1} Other Product`}
                textType="extrasmall"
                color="text-gray-400"
              />
            )}
          </div>
        </div>

        <div className={``}>
          <CustomText
            text={`Total`}
            textType="small"
            weightType="semibold"
            extraStyle="text-gray-300"
          />
          <CustomText
            text={`₦${amount}`}
            textType="medium"
            weightType="semibold"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div>
          <CustomText
            text="Order Date"
            textType="extrasmall"
            color="text-gray-400"
          />
          <CustomText
            text={`${orderDate}`}
            textType="small"
            weightType="semibold"
          />
        </div>
        <div>
          <CustomText
            text="Customer"
            textType="extrasmall"
            color="text-gray-400"
          />
          <CustomText
            text={`${customerName}`}
            textType="small"
            weightType="semibold"
          />
        </div>
        <div>
          <CustomText
            text="Payment"
            textType="extrasmall"
            color="text-gray-400"
          />
          <CustomText
            text={`${paymentMethod}`}
            textType="small"
            weightType="semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
