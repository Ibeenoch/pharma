import React, { useState } from "react";
import CustomText from "../../common/Text";
import {
  mappedAllOrdersProps,
  OrderStatusProps,
} from "../../../types/order/OrderType";
import CustomSelect from "../../common/Select";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { updateOrderStatus } from "../../../features/order/orderSlice";
import { selectAuth } from "../../../features/auth/authSlice";

interface OrderDetailsProps {
  order: mappedAllOrdersProps | undefined;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const [status, setStatus] = useState<string>((order && order.status) || "");
  const listStatus = [
    {
      value: "Processing",
      label: "Processing",
    },
    {
      value: "Shipped",
      label: "Shipped",
    },
    {
      value: "Delivered",
      label: "Delivered",
    },
    {
      value: "Cancelled",
      label: "Cancelled",
    },
  ];
  const handleChange = (status: string) => {
    setStatus(status);
    if (user && user.userId && order && order.$id) {
      const orderData: OrderStatusProps = {
        orderId: order && order.$id,
        status,
        userId: user && user.userId,
      };
      dispatch(updateOrderStatus(orderData));
    }
  };
  return (
    <div className="max-h-[400px] overflow-y-auto">
      <CustomText
        text={`#${order && order.$id}`}
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
      <div className="flex gap-8 items-center justify-between border-b border-gray-300 pb-4">
        <div className="flex gap-1 items-center">
          <div className="flex gap-1 items-center p-2 border border-gray-300 rounded-lg">
            <img
              src={order && order.image}
              alt="items-img"
              className="w-7 h-7"
            />
          </div>
          <div>
            <CustomText
              text={order && order.productname} // product name
              textType="extrasmall"
              weightType="semibold"
            />
            <CustomText
              text={order && order.productCategory}
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
            text={`${order && order.totalItems}pcs`}
            textType="small"
            color="text-gray-500"
            weightType="normal"
          />
        </div>

        <div>
          {/* price ₦ */}
          <CustomText
            text={`${order && order.totalAmount}`}
            textType="small"
            color="text-amber-500"
            weightType="medium"
          />
        </div>
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
            text={order && order.orderDate}
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
            text={order && order.orderId}
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
          <CustomSelect
            onChange={(status) => handleChange(status)}
            value={status}
            Id="status"
            options={listStatus}
            bgColor="bg-amber-500"
            className="text"
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

export default OrderDetails;
