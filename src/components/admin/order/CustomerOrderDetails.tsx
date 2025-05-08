import React, { lazy } from "react";
const CustomText = lazy(() => import("../../common/Text"));
import { AllOrderUserResultData } from "../../../types/order/OrderType";
import {  formatDateWithOrdinal } from "../../../utils/dateFormatter";

interface CustomerOrderDetailsProps {
  order: AllOrderUserResultData | undefined;
}

const CustomerOrderDetails: React.FC<CustomerOrderDetailsProps> = ({ order }) => {

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <CustomText
        text={`${order && order.id}`}
        textType="small"
        weightType="semibold"
        extraStyle="my-1"
      />
      <CustomText
        text="Order details"
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
         <div className="">
       {
         order && order.image && Array.isArray(order.image) && order.image.map((orderImg, i) => (
           <>
              <div className="flex gap-8 items-center justify-between border-b border-gray-300 pb-4">
              <div className="flex gap-1 items-center">
                
                <div className="flex gap-1 items-center p-2 border border-gray-300 rounded-lg">
                  <img
                    src={orderImg[i][0]}
                    alt="items-img"
                    className="w-7 h-7"
                  />
                </div>
                <div>
                  <CustomText
                    text={order && order.productname[i]} // product name
                    textType="extrasmall"
                    weightType="semibold"
                  />
                  <CustomText
                    text={order && order.productCategory[i]}
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
                  text='Quantity'
                  textType="small"
                  weightType="semibold"
                  color="text-gray-500"
                />
                <CustomText
                  text={`${order && order.totalItems[i]}pcs`}
                  textType="small"
                  color="text-gray-500"
                  weightType="normal"
                />
              </div>

              <div>
                {/* price ₦ */}
                <CustomText
                  text='Amount'
                  textType="small"
                  weightType="semibold"
                  color="text-gray-500"
                />
                <CustomText
                  text={`₦${order && order.totalAmount[i]}`}
                  textType="small"
                  color="text-amber-500"
                  weightType="medium"
                />
              </div>
      </div>
              </>
            ))
          }
      </div>

      <div>
        <CustomText
          text="Shipping Details"
          textType="small"
          weightType="semibold"
          color="text-gray-500"
        />
        <div className="grid grid-cols-2 pb-4 pt-2 border-b border-gray-300">
          <CustomText
            text="Shipping Address"
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
          <CustomText
            text={order && order.address}
            textType="small"
            weightType="semibold"
            extraStyle="my-1"
          />
          <CustomText
            text="Date Created"
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
          <CustomText
            text={formatDateWithOrdinal(order && order.orderDate ? order.orderDate : '')}
            textType="small"
            weightType="semibold"
            extraStyle="my-1"
          />
          <CustomText
            text="Order No"
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
          <CustomText
            text={order && order.id}
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
            text={order && order.paymentMethod}
            textType="small"
            color={`text-green-500`}
            weightType="semibold"
            extraStyle="my-1"
          />
          <CustomText
            text="Order Status"
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
          <CustomText
            text={order && order.status}
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
        </div>
      </div>

      <div className="border-b border-gray-300">
        <CustomText
          text="User Details"
          textType="small"
          weightType="semibold"
          color="text-gray-500"
          extraStyle="my-1"
        />
        <div className="grid grid-cols-2">
          <CustomText
            text="Full Name"
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
          <CustomText
            text={`${order && order.customerName}`}
            textType="small"
            weightType="semibold"
            extraStyle="my-1"
          />
          <CustomText
            text="User Address"
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
          <CustomText
            text={`${order && order.address}`}
            textType="small"
            weightType="semibold"
            extraStyle="my-1"
          />
          <CustomText
            text="User Email"
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
          <CustomText
            text={`${order && order.email}`}
            textType="small"
            weightType="semibold"
            extraStyle="my-1"
          />
        </div>
      </div>
      {/* 
      <div className="border-b border-gray-300">
        <div className="">
          <CustomText
            text="Product Description"
            textType="small"
            weightType="semibold"
            extraStyle="my-1"
          />

          <CustomText
            text={`${product && product.description}`}
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
        </div>
      </div>
      <div className="border-b border-gray-300">
        <div className="">
          <CustomText
            text="Additional Information"
            textType="small"
            weightType="semibold"
            extraStyle="my-1"
          />
          <CustomText
            text={`${product && product.additionalInfo}`}
            textType="small"
            color="text-gray-500"
            weightType="normal"
            extraStyle="my-1"
          />
        </div>
      </div> */}
    </div>
  );
};

export default CustomerOrderDetails;
