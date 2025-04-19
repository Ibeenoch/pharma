import { FormEvent, useState } from "react";
import CustomInput from "../../components/common/Input";
import CustomButton from "../../components/common/Button";
import TrackIcon from "../../components/cart/TrackIcon";
import CustomText from "../../components/common/Text";
import OrderDetails from "../../components/order/OrderDetails";
import VerticaltrackedOrder from "../../components/order/VerticaltrackedOrder";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { OrderArgs } from "../../types/order/OrderType";
import { getOrder, selectOrder } from "./orderSlice";
import {
  formatDateWithOrdinal,
  getRelativeTime,
} from "../../utils/dateFormatter";

const Order = () => {
  const { orderId, userId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [orderNum, setOrderNum] = useState<string>(orderId ?? "");
  const [orderFound, setOrderFound] = useState<boolean>(false);
  const { status, order } = useAppSelector(selectOrder);

  const handleFindOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (orderNum) {
      const orderData = { orderId: orderNum, userId } as OrderArgs;
      dispatch(getOrder(orderData)).then((res) => {
        if (res.payload) setOrderFound(true);
      });
    }
  };
  const navigateShippingUpdate = () => {
    navigate(`/order_history/${userId}`);
  };
  return (
    <>
      <form
        onSubmit={handleFindOrder}
        className="mx-auto md:w-[50%] mt-25 px-4 md:px-0"
      >
        <CustomInput
          value={orderNum}
          onChange={setOrderNum}
          type="search"
          Id="orderNum"
          placeholder="Enter your order number to track your item"
          required={true}
          showFullWidth={true}
          label="Track Your Order"
        />
        <CustomButton
          text="Track Order"
          type="submit"
          textSize="normal"
          fullwidth={true}
          showArrow={true}
          className="my-4"
          isLoading={status === "loading"}
        />
      </form>
      {orderFound && order && order.$id ? (
        <section className="h-full md:grid md:grid-cols-2 gap-2 px-4 md:px-0">
          <div>
            <div className="my-2 p-4 mx-auto bg-white rounded-xl">
              <CustomText
                text={`Your Order #${order && order.$id} is being processed`}
                textType="normal"
                weightType="semibold"
                color="text-gray-500"
                extraStyle="my-6 text-center"
              />

              <TrackIcon
                stage={
                  order && order.orderStatus?.toLowerCase() === "processing"
                    ? 2
                    : order && order.orderStatus?.toLowerCase() === "shipped"
                      ? 3
                      : order &&
                          order.orderStatus?.toLowerCase() === "delivered"
                        ? 4
                        : 0
                }
              />
            </div>

            <div className="bg-white p-4 mx-auto my-4 rounded-xl">
              <CustomText
                text="Order Details"
                textType="normal"
                weightType="semibold"
              />
              <OrderDetails
                leftText="Order Number"
                rightText={`#${order && order.$id}`}
              />
              <OrderDetails
                leftText="Tracking ID"
                rightText={`#${order && order.$id}`}
              />
              <OrderDetails
                leftText="Order Status"
                rightText={`${order && order.orderStatus}`}
              />
              <OrderDetails
                leftText="Date Created"
                rightText={
                  order &&
                  order.createdAt &&
                  formatDateWithOrdinal(order.createdAt)
                }
              />
              <OrderDetails
                leftText="Last Updated"
                rightText={
                  order &&
                  order.lastUpdated &&
                  getRelativeTime(order.lastUpdated)
                }
              />
            </div>
          </div>

          <div className="bg-white p-4 my-4 rounded-xl">
            <div className="border-b border-gray-300 pb-4 flex justify-between items-center">
              <CustomText
                text="Delivery Status"
                textType="normal"
                weightType="semibold"
              />
              <div className="py-2 px-6 rounded-md bg-white border border-amber-500">
                <CustomText
                  text={order && order.orderStatus}
                  textType="small"
                  weightType="semibold"
                />
              </div>
            </div>

            {/* track order icon  */}
            <VerticaltrackedOrder
              steps={
                order && order.orderStatus?.toLowerCase() === "processing"
                  ? 2
                  : order && order.orderStatus?.toLowerCase() === "shipped"
                    ? 3
                    : order && order.orderStatus?.toLowerCase() === "delivered"
                      ? 4
                      : 0
              }
              ordertime={order && order.createdAt}
              shippedtime={order && order.lastUpdated}
              deliveredtime={order && order.createdAt}
            />

            <OrderDetails leftText="Courier: " rightText="On Fleet" />
            <OrderDetails
              leftText="Tracking Number: "
              rightText="#134OaAdhabw8hq67"
            />
            <CustomButton
              text="View Order History"
              fullwidth={true}
              onClick={navigateShippingUpdate}
            />
          </div>
        </section>
      ) : (
        <section className="h-40 my-3 w-full flex items-center justify-center bg-white gap-2 px-4 md:px-0">
          <CustomText
            text="No Order Found"
            textType="normal"
            weightType="medium"
            extraStyle="text-center"
          />
        </section>
      )}
    </>
  );
};

export default Order;
