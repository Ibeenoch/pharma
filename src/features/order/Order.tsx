import { FormEvent, lazy, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { OrderArgs } from "../../types/order/OrderType";
import { getOrder, selectOrder } from "./orderSlice";
import {
  formatDateWithOrdinal,
  getRelativeTime,
} from "../../utils/dateFormatter";
const CustomText = lazy(() => import("../../components/common/Text"));
const CustomInput = lazy(() => import("../../components/common/Input"));
const CustomButton = lazy(() => import("../../components/common/Button"));
const TrackIcon = lazy(() => import("../../components/cart/TrackIcon"));
const OrderDetails = lazy(() => import("../../components/order/OrderDetails"));
const VerticaltrackedOrder = lazy(() => import("../../components/order/VerticaltrackedOrder"));

const Order = () => {
  const { orderId, userId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [orderNum, setOrderNum] = useState<string>(orderId ?? "");
  const [orderFound, setOrderFound] = useState<boolean>(false);
  const { order } = useAppSelector(selectOrder);

  const navigateShippingUpdate = () => {
    navigate(`/order_history/${userId}`);
  };


  useEffect(() => {
    if (orderNum) {
      const orderData = { orderId: orderNum, userId } as OrderArgs;
      dispatch(getOrder(orderData)).then((res) => {
        if (res.payload) setOrderFound(true);
      });
    }
  }, [orderNum])
  return (
    <>
    
      {orderFound && order && order.$id ? (
        <section className="h-full md:grid md:grid-cols-2 mt-20 gap-2 px-4 md:px-0">
          <div>
            <div className="md:my-2 mb-2 mt-4 p-4 mx-auto bg-white rounded-xl">
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
                  order.$createdAt &&
                  formatDateWithOrdinal(order.$createdAt)
                }
              />
              <OrderDetails
                leftText="Last Updated"
                rightText={
                  order && order.$updatedAt && getRelativeTime(order.$updatedAt)
                }
              />
            </div>

            <div className="bg-white p-4 mx-auto my-4 rounded-xl">
              <CustomText
                text="Product Details"
                textType="normal"
                weightType="semibold"
              />

              {
              order && order.cart && Array.isArray(order.cart) && order.cart.map((c) => (

                <div className="flex items-start justify-between my-3 pb-3 border-b border-gray-300/30">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-100 rounded-md">
                      <img src={c && c.imagesUrl[0]} alt="order image" className="w-7 h-" />
                    </div>
                    <div>
                    <CustomText 
                    text={c.name}
                    textType="normal"
                    weightType="semibold"
                    />
                    <CustomText 
                    text={c.category}
                    textType="small"
                    weightType="medium"
                    color="text-gray-500"
                    />
                    <CustomText 
                    text={`${String(c.quantity)} item${c.quantity === 1 ? '': 's'}`}
                    textType="extrasmall"
                    weightType="medium"
                    color="text-gray-500"
                    />
                    </div>
                  </div>

                  <div>
                     <CustomText 
                    text='Price'
                    textType="normal"
                    weightType="semibold"
                    />
                      <CustomText 
                      text={`₦${c.price}`}
                        textType="small"
                    weightType="medium"
                    color="text-gray-500"
                      />
                  </div>

                  <div>
                     <CustomText 
                    text='Total Amount'
                    textType="normal"
                    weightType="semibold"
                    />
                      <CustomText 
                      text={`₦${c.price * c.quantity}`}
                        textType="small"
                    weightType="medium"
                    color="text-gray-500"
                      />
                  </div>
                </div>
              ))
              }
            
            </div>
          </div>

          <div className="bg-white p-4 my-4 rounded-xl h-max">
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
              ordertime={order && order.$createdAt}
              shippedtime={order && order.$updatedAt}
              deliveredtime={order && order.$createdAt}
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
