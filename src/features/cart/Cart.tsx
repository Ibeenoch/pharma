import CustomText from "../../components/common/Text";
import Trash from "../../assets/icons/trash-bin.svg?react";
import productImg1 from "../../assets/images/cc4.png";
import productImg2 from "../../assets/images/cc3.png";
import IconAndText from "../../components/cart/IconAndText";
import QtyUpdateBtn from "../../components/product/QtyUpdateBtn";
import { useState } from "react";
import CartRowItem from "../../components/cart/CartRowItem";
import CustomButton from "../../components/common/Button";
import CartTwoText from "../../components/cart/CartTwoText";

const Cart = () => {
  const [qty, setQty] = useState<number>(1);

  const increaseNum = () => setQty(qty + 1);
  const decreaseNum = () => setQty((prev) => Math.max(1, prev - 1));
  return (
    <section className={`mt-20 my-10 h-screen md:w-[70%] md:mx-auto  p-4`}>
      <div className="flex justify-between items-center my-2">
        <CustomText
          text="Shopping Cart"
          textType="medium"
          weightType="semibold"
        />

        <IconAndText Icon={Trash} text="Remove all" />
      </div>

      {/* map throught the cart items  */}
      <CartRowItem
        image={productImg1}
        itemTitle="Cough Syrup"
        itemdesc="Size: 250ml"
        price="₦3,750.50"
        qty={qty}
        decreaseQty={decreaseNum}
        increaseQty={increaseNum}
      />
      <CartRowItem
        image={productImg2}
        itemTitle="Pain Killer"
        itemdesc="Size: 150ml"
        price="₦2,340.90"
        qty={qty}
        decreaseQty={decreaseNum}
        increaseQty={increaseNum}
      />

      <div className="bg-white flex justify-around items-center mx-auto py-2 px-4 rounded-xl my-3 ">
        <input
          type="text"
          placeholder="Promo code"
          className="w-full p-4 bg-transparent border-none outline-none placeholder:text-gray-400"
        />
        <CustomButton
          text="Apply"
          textSize="small"
          weightType="medium"
          borderRadiusType="threecurved"
        />
      </div>

      <CartTwoText
        leftText="Subtotal"
        rightText="₦12,540.90"
        showBorder={true}
        borderColor="border-white"
      />
      <CartTwoText
        leftText="Shipping"
        rightText="₦1,500."
        showBorder={true}
        borderColor="border-white"
      />
      <CartTwoText leftText="Total" rightText="₦14,040.90" />
    </section>
  );
};

export default Cart;
