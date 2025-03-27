import React, { useState } from "react";
import CustomInput from "../../components/common/Input";
import CustomButton from "../../components/common/Button";

const Order = () => {
  const [orderNum, setOrderNum] = useState<string>("");
  return (
    <section className="h-screen mt-20">
      <div className="w-[40%]">
        <CustomInput
          value={orderNum}
          onChange={setOrderNum}
          type="search"
          Id="orderNum"
          placeholder="Enter your order number below for update"
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
    </section>
  );
};

export default Order;
