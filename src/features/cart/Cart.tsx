import CustomText from "../../components/common/Text";
import Trash from "../../assets/icons/trash-bin.svg?react";
import Lock from "../../assets/icons/lock.svg?react";
import IconAndText from "../../components/cart/IconAndText";
import CartRowItem from "../../components/cart/CartRowItem";
import CustomButton from "../../components/common/Button";
import CartTwoText from "../../components/cart/CartTwoText";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  calculateSubTotal,
  calculateTotal,
  checkIfItemHasBeenAddedToCheck,
  decreaseCartQty,
  increaseCartQty,
  removeAllItemsInCart,
  removeFromCart,
  selectCart,
} from "./cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../auth/authSlice";
import { getShippingDetails, selectOrder } from "../order/orderSlice";

interface CartProps {
  showCheckOutBtn?: boolean;
  isCheckOutPage?: boolean;
}

const Cart: React.FC<CartProps> = ({
  showCheckOutBtn = true,
  isCheckOutPage = false,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cart, subTotal, total } = useAppSelector(selectCart);
  const { hasPreviousShippingDetails } = useAppSelector(selectOrder);
  const { user } = useAppSelector(selectAuth);
  const increaseQty = (id: string) => {
    dispatch(increaseCartQty(id));
    dispatch(calculateSubTotal());
  };

  const decreaseQty = (id: string) => {
    dispatch(decreaseCartQty(id));
    dispatch(calculateSubTotal());
  };
  const handleRemoveAllFromCart = () => {
    dispatch(removeAllItemsInCart());
    dispatch(calculateSubTotal());
  };

  useEffect(() => {
    dispatch(calculateSubTotal());
    dispatch(calculateTotal(0));
  }, [subTotal]);

  const removeItemFromCart = (id: string) => {
    dispatch(removeFromCart(id));
    dispatch(checkIfItemHasBeenAddedToCheck(id));
    dispatch(calculateSubTotal());
  };

  const proceedCheckOutPage = () => {
    user &&
      user.userId &&
      hasPreviousShippingDetails === false &&
      dispatch(getShippingDetails(user && user.userId));
    navigate("/checkout");
  };

  return (
    <section
      className={`mt-20 h-min ${
        isCheckOutPage ? "bg-white" : "md:w-[70%] md:mx-auto"
      }  rounded-xl p-4`}
    >
      {cart === null || cart.length === 0 ? (
        <></>
      ) : (
        <div className="flex justify-between items-center my-2">
          <CustomText
            text={isCheckOutPage ? "Review Your Cart" : "Shopping Cart"}
            textType="medium"
            weightType="semibold"
          />

          <div onClick={handleRemoveAllFromCart}>
            <IconAndText Icon={Trash} text="Remove all" />
          </div>
        </div>
      )}

      {/* map throught the cart items  */}
      {cart.map(
        (c) =>
          c &&
          c.item &&
          c.item.$id && (
            <CartRowItem
              isCheckOutPage={isCheckOutPage}
              removeItemFromCart={() => {
                c &&
                  c.item &&
                  c.item.$id &&
                  removeItemFromCart(c && c.item && c.item.$id);
              }}
              image={c && c.item && c.item.imagesUrl && c.item.imagesUrl[0]}
              itemTitle={c && c.item && c.item.name}
              itemdesc={`Unit Price: ₦${c && c.item && c.item.price}`}
              price={`
                Total: ₦${
                  c &&
                  c.item &&
                  c.item.price &&
                  c.item.discount &&
                  c.item.price * Math.abs(1 - c.item.discount / 100) * c.qty
                }`}
              qty={c && c.qty}
              decreaseQty={() => {
                c &&
                  c.item &&
                  c.item.$id &&
                  decreaseQty(c && c.item && c.item.$id);
              }}
              increaseQty={() => {
                c &&
                  c.item &&
                  c.item.$id &&
                  increaseQty(c && c.item && c.item.$id);
              }}
              isCheckOut={isCheckOutPage}
              id={c && c.item && c.item.$id}
            />
          )
      )}
      {cart === null || cart.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <CustomText text="No Items has beed added to the cart" />
        </div>
      ) : (
        <>
          <div
            className={`${
              isCheckOutPage ? "bg-[#f4f4f4]" : "bg-white"
            } flex justify-around items-center mx-auto py-2 px-4 rounded-xl my-3`}
          >
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
            rightText={`₦${subTotal}`}
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
          <CartTwoText leftText="Total" rightText={`₦${total}`} />
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
                onClick={proceedCheckOutPage}
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
              <IconAndText Icon={Lock} text="Secure Checkout - SSL Encrypted" />
              <CustomText
                text="Ensuring your financial and personal details are secure during every transaction"
                textType="small"
                color="text-gray-500"
              />
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Cart;
