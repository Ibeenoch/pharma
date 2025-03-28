import React, { useState } from "react";
import CustomInput from "../../components/common/Input";
import CustomButton from "../../components/common/Button";
import TrackIcon from "../../components/cart/TrackIcon";
import CustomText from "../../components/common/Text";
import OrderDetails from "../../components/order/OrderDetails";
import VerticaltrackedOrder from "../../components/order/VerticaltrackedOrder";

const Order = () => {
  const [orderNum, setOrderNum] = useState<string>("");
  return (
    <>
     <div className="mx-auto md:w-[50%] mt-25 px-4 md:px-0">
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
          text="Submit"
          textSize="normal"
          fullwidth={true}
          showArrow={true}
          className="my-4"
        />
    
      </div>
    <section className="h-full md:grid md:grid-cols-2 gap-2 px-4 md:px-0">
      <div>
      <div className="my-2 p-4 mx-auto bg-white rounded-xl">
        <CustomText
        text="Your Order #Ay90Gquwjm1km is being processed"
        textType="normal"
        weightType="semibold"
        color="text-gray-500"
        extraStyle="my-6 text-center"
        />

       
          <TrackIcon/>
        </div>

        <div className="bg-white p-4 mx-auto my-4 rounded-xl">
          <CustomText text="Order Details" textType="normal" weightType="semibold" />
          <OrderDetails leftText="Order Number" rightText="#Ay90Gquwjm1km" />
          <OrderDetails leftText="Tracking ID" rightText="#Spijwio7wjm1km" />
          <OrderDetails leftText="Order Status" rightText="Processing" />
          <OrderDetails leftText="Date Created" rightText="Wed, April 25th 2025" />
          <OrderDetails leftText="Last Updated" rightText="2 months ago" />
         
        </div>
      </div>

      <div className="bg-white p-4 my-4 rounded-xl">
        <div className="border-b border-gray-300 pb-4 flex justify-between items-center">
            <CustomText text="Delivery Status" textType="normal" weightType="semibold" />
            <div className="py-2 px-6 rounded-md bg-white border border-amber-500">
              <CustomText text="Shipped" textType="small" weightType="semibold" />
            </div>
        </div>

        {/* track order icon  */}
          <VerticaltrackedOrder />

          <OrderDetails leftText="Courier: " rightText="On Fleet" />
          <OrderDetails leftText="Tracking Number: " rightText="#134OaAdhabw8hq67" />
          <CustomButton text="Get Shipping Update" fullwidth={true} />

      </div>
    </section>
    </>
  );
};

export default Order;
