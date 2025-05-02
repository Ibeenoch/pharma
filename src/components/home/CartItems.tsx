import Cancel from "../../assets/icons/cancel-close.svg?react";
import CancelCircle from "../../assets/icons/trash-bin.svg?react";
import CustomText from "../common/Text";
import CustomButton from "../common/Button";
import { cartProps, ProductDataProps } from "../../types/product/ProductData";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import {
  calculateSubTotal,
  checkIfItemHasBeenAddedToCheck,
  increaseOrDecreaseCartQty,
  removeAllItemsInCart,
  removeFromCart,
  selectCart,
  updateCartIndex,
  updateCartQty,
} from "../../features/cart/cartSlice";
import { useEffect, useState } from "react";
import { selectAuth, toggleProfileTocheckOut } from "../../features/auth/authSlice";
import {
  getShippingDetails,
  selectOrder,
} from "../../features/order/orderSlice";

interface CartItemsProps {
  showCart: boolean;
  hideShowCart: () => void;
  product: cartProps[];
}

const CartItems: React.FC<CartItemsProps> = ({
  showCart,
  hideShowCart,
  product,
}) => {
  const { subTotal, cart } = useAppSelector(selectCart);
  const { user, profileToCheckOut } = useAppSelector(selectAuth);
  const { hasPreviousShippingDetails } = useAppSelector(selectOrder);

  const [cQty, setCQty] = useState<number>(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(calculateSubTotal());
  }, [showCart]);

  const handleQtySelected = (
    e: React.ChangeEvent<HTMLSelectElement>,
    i: number,
    s: string
  ) => {
    let num = parseInt(e.target.value);
    setCQty(num);
    dispatch(increaseOrDecreaseCartQty({ id: s, val: num }));
    dispatch(calculateSubTotal());
  };

  const handleRemoveFromCart = (id: string, i: number) => {
    dispatch(removeFromCart(id));
    dispatch(checkIfItemHasBeenAddedToCheck(id));
    cart.length === 1 && hideShowCart();
  };

  const handleRemoveAllFromCart = () => {
    dispatch(removeAllItemsInCart());
    hideShowCart();
  };

  const viewCartPage = () => {
    navigate("/cart");
  };

  const proceedToCheckOut = () => {
    if(!user || !user.userId){ 
      navigate('/login')
    } else{
      // yes means its coming from profile to checkout
      if(profileToCheckOut === "yes"){
        dispatch(toggleProfileTocheckOut('no'))
      }
      user &&
        user.userId &&
        hasPreviousShippingDetails === false &&
        dispatch(getShippingDetails(user && user.userId));
     
      navigate(`/checkout/${user && user.userId}`);
    }
  };
  return (
    <section
      className={`hidden ${
        showCart ? "lg:block" : "lg:hidden"
      } absolute right-5 top-30 w-[250px] h-max bg-white p-4`}
    >
      <div className="flex justify-end cursor-pointer" onClick={hideShowCart}>
        <Cancel className="w-5 h-5" />
      </div>

      <div className="border-b border-gray-300 mb-2 py-2 flex items-center justify-between">
        <CustomText text="Cart" textType="normal" weightType="semibold" />
        <div
          onClick={handleRemoveAllFromCart}
          className="flex items-center gap-1 cursor-pointer"
        >
          <CancelCircle className="ml-4 w-4 h-4 stroke-gray-400 cursor-pointer" />
          <CustomText
            text="Remove All"
            textType="extrasmall"
            weightType="medium"
          />
        </div>
      </div>

      <div>
        {/* cart item  */}
        {product &&
          product.map((p, i) => (
            <div className="flex gap-1 items-center mb-2 pb-3 border-b border-gray-300">
              <div className="p-1 flex justify-center items-center ">
                <img
                  src={p && p.item && p.item.imagesUrl && p.item.imagesUrl[0]}
                  alt="cart image"
                  className="w-10 h-10"
                />
              </div>
              <div>
                <CustomText
                  text={
                    p && p.item && p.item.name && p.item.name.length > 12
                      ? p.item.name.slice(0, 12) + "..."
                      : p.item.name
                  }
                  textType="normal"
                  weightType="thin"
                  extraStyle="w-25"
                />
                <div className="flex justify-between items-center gap-1">
                  <CustomText
                    text={`₦${
                      p &&
                      p.item &&
                      p.item.price &&
                      p.item.discount &&
                      p.item.price - (p.item.discount / 100) * p.item.price
                    }`}
                    textType="normal"
                    weightType="thin"
                    color="gray"
                  />

                  <select
                    value={p && p.qty}
                    onChange={(e) => {
                      p &&
                        p.item &&
                        p.item.$id &&
                        handleQtySelected(
                          e,
                          p && p.qty,
                          p && p.item && p.item.$id
                        );
                    }}
                    className="border border-gray-300 text-gray-500 text-[11px] px-2 py-1 rounded-md outline-none"
                  >
                    {Array.from({ length: 50 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div
                onClick={() => {
                  p &&
                    p.item &&
                    p.item.$id &&
                    handleRemoveFromCart(p && p.item && p.item.$id, i);
                }}
              >
                <CancelCircle className="ml-4 w-7 h-5 stroke-gray-400 cursor-pointer" />
              </div>
            </div>
          ))}
      </div>

      <div className="grid grid-cols-2">
        <CustomText
          text={`Subtotal:`}
          textType="normal"
          weightType="thin"
          color="text-gray-500"
          extraStyle="pb-2 mb-2 border-b border-gray-300 text-center"
        />
        <CustomText
          text={`₦${subTotal}`}
          textType="normal"
          weightType="thin"
          color="text-gray-500"
          extraStyle="pb-2 mb-2 border-b border-gray-300 text-center"
        />
      </div>

      <div className="flex flex-col gap-3 w-max items-center mx-auto justify-center">
        <CustomButton
          text="View Cart"
          showArrow={true}
          textSize="normal"
          defaultBackgroundColor="bg-amber-500"
          fullwidth={true}
          onClick={viewCartPage}
        />
        <CustomButton
          text="Checkout"
          showArrow={true}
          textSize="normal"
          fullwidth={true}
          onClick={proceedToCheckOut}
        />
      </div>
    </section>
  );
};

export default CartItems;
