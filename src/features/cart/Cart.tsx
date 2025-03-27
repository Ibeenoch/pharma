import CustomText from "../../components/common/Text";
import Trash from "../../assets/icons/trash-bin.svg?react";
import Lock from "../../assets/icons/lock.svg?react";
import productImg1 from "../../assets/images/cc4.png";
import productImg2 from "../../assets/images/cc3.png";
import IconAndText from "../../components/cart/IconAndText";
import { useState } from "react";
import CartRowItem from "../../components/cart/CartRowItem";
import CustomButton from "../../components/common/Button";
import CartTwoText from "../../components/cart/CartTwoText";

interface CartProps {
  showCheckOutBtn?: boolean;
  isCheckOutPage?: boolean;
}

const Cart: React.FC<CartProps> = ({
  showCheckOutBtn = true,
  isCheckOutPage = false,
}) => {
  const [qty, setQty] = useState<number>(1);

  const increaseNum = () => setQty(qty + 1);
  const decreaseNum = () => setQty((prev) => Math.max(1, prev - 1));
  return (
    <section
      className={`mt-20 h-min ${
        isCheckOutPage ? "bg-white" : "md:w-[70%] md:mx-auto"
      }  rounded-xl p-4`}
    >
      <div className="flex justify-between items-center my-2">
        <CustomText
          text={isCheckOutPage ? "Review Your Cart" : "Shopping Cart"}
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
        isCheckOut={isCheckOutPage}
      />

      <CartRowItem
        image={productImg2}
        itemTitle="Pain Killer"
        itemdesc="Size: 150ml"
        price="₦2,340.90"
        qty={qty}
        decreaseQty={decreaseNum}
        increaseQty={increaseNum}
        isCheckOut={isCheckOutPage}
      />

      <div className={`${ isCheckOutPage ? 'bg-[#f4f4f4]' : 'bg-white'} flex justify-around items-center mx-auto py-2 px-4 rounded-xl my-3`}>
        <input
          type="text"
          placeholder="Promo code"
          className="w-full p-4 bg-transparent border-none outline-none placeholder:text-sm placeholder:text-gray-400"
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
        rightText="₦1,500"
        showBorder={true}
        borderColor="border-white"
      />
      <CartTwoText
        leftText="Discount"
        rightText="₦0.00"
        showBorder={true}
        borderColor="border-white"
      />
      <CartTwoText leftText="Total" rightText="₦14,040.90" />
      {showCheckOutBtn && (
        <div className={`my-4 flex justify-center`}>
          <CustomButton
            text="Proceed To Checkout"
            borderRadiusType="threecurved"
            textSize="normal"
            weightType="medium"
            showArrow={true}
            fullwidth={true}
            type="button"
          />
        </div>
      )}
      {!showCheckOutBtn && (
        <>
        <div className={`my-4 flex justify-center`}>
          <CustomButton
            text="Order Now"
            borderRadiusType="threecurved"
            textSize="normal"
            weightType="medium"
            showArrow={true}
            fullwidth={true}
            type="submit"
          />
        </div>
        <IconAndText Icon={Lock} text="Secure Checkout - SSL Encrypted"/>
        <CustomText text="Ensuring your financial and personal details are secure during every transaction" textType="small" color="text-gray-500" />

        </>
      )}
    </section>
  );
};

export default Cart;
