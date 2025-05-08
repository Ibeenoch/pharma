import React, { lazy } from "react";
const CustomText = lazy(() => import("../../common/Text"));
import { formatDate } from "../../../utils/dateFormatter";
import { AllOrderResultData } from "../../../types/order/OrderType";
import { TransactionProps } from "../../../types/payment/FlutterwavePaymentType";
import { formatWithCommas } from "../../../utils/formatAmount";

interface TransactionDetailsProps {
  order: AllOrderResultData;
  transactions: TransactionProps;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transactions,
  order,
}) => {
  console.log('transactions ', transactions, 'order ', order)
  return (
    <div className="">
      <CustomText
        text={"#" + order.transaction.$id}
        textType="small"
        weightType="semibold"
        extraStyle="my-1"
      />
      <CustomText
        text="Transaction details"
        textType="small"
        color="text-gray-500"
        weightType="normal"
        extraStyle="mt-1 pb-3 border-b border-gray-300"
      />
      <CustomText
        text="Items"
        textType="small"
        color="text-gray-500"
        weightType="normal"
        extraStyle="my-1"
      />
      {order.cart.map((t) => (
        <div className="flex gap-8 items-center justify-between my-1 border-b border-gray-300 pb-4">
          <div className="flex gap-1 items-center">
            <div className="flex gap-1 items-center p-2 border border-gray-300 rounded-lg">
              <img
                src={t.imagesUrl[0] as string}
                alt="items-img"
                className="w-7 h-7"
              />
            </div>
            <div>
              <CustomText
                text={t.name} // name
                textType="extrasmall"
                weightType="semibold"
              />
              <CustomText
                text={t.category} // category
                textType="extrasmall"
                color="text-gray-500"
                weightType="normal"
                extraStyle=""
              />
            </div>
          </div>

          <div>
            {/* qty  */}
            <CustomText
              text={`${t.quantity} pcs`}
              textType="small"
              color="text-gray-500"
              weightType="normal"
            />
          </div>

          <div>
            {/* price  */}
            <CustomText
              text={'Total'}
              textType="small"
              weightType="semibold"
            />
            <CustomText
              text={`₦${formatWithCommas((t.price - ((t.discount/100) * t.price)))}`}
              textType="small"
              color="text-amber-500"
              weightType="medium"
            />
          </div>
        </div>
      ))}

      <div className="grid grid-cols-2 pb-4 pt-2 border-b border-gray-300">
        <CustomText
          text="Created at"
          textType="small"
          color="text-gray-500"
          weightType="normal"
          extraStyle="my-1"
        />
        <CustomText
          text={order && order.$createdAt && formatDate(order.$createdAt)}
          textType="small"
          weightType="semibold"
          extraStyle="my-1"
        />
        <CustomText
          text="Delivery Service"
          textType="small"
          color="text-gray-500"
          weightType="normal"
          extraStyle="my-1"
        />
        <CustomText
          text={transactions.shippingType}
          textType="small"
          weightType="semibold"
          extraStyle="my-1"
        />
        <CustomText
          text="Payment Method"
          textType="small"
          color="text-gray-500"
          weightType="normal"
          extraStyle="my-1"
        />
        <CustomText
          text={transactions.payMethod}
          textType="small"
          weightType="semibold"
          extraStyle="my-1"
        />
        <CustomText
          text="Status"
          textType="small"
          color="text-gray-500"
          weightType="normal"
          extraStyle="my-1"
        />
        <CustomText
          text={transactions.status}
          textType="small"
          color={`text-green-500`}
          weightType="semibold"
          extraStyle="my-1"
        />
      </div>

      <div className="border-b border-gray-300">
        <CustomText
          text="Payment"
          textType="small"
          weightType="semibold"
          color="text-gray-500"
          extraStyle="my-1"
        />
        <div className="grid grid-cols-2">
          <CustomText
            text="Sub Total"
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
          <CustomText
            text={`₦${order.cart[0].total - 1500}`}
            textType="small"
            weightType="semibold"
            extraStyle="my-1"
          />
          <CustomText
            text="Shipping Fee"
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
          <CustomText
            text="₦1,500.00"
            textType="small"
            weightType="semibold"
            extraStyle="my-1"
          />
          <CustomText
            text="Total"
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
          <CustomText
            text={`₦${order.cart[0].total}`}
            textType="small"
            weightType="semibold"
            extraStyle="my-1"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
