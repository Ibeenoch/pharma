import React, { lazy } from "react";
import Trash from "../../assets/icons/trash-filled.svg?react";
import ShoppinCart from "../../assets/icons/cart-fill-white.svg?react";
import { cartProps, ProductDataProps } from "../../types/product/ProductData";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addToCart, selectCart } from "../../features/cart/cartSlice";
const IconAndText = lazy(() => import("./IconAndText"));
const CustomButton = lazy(() => import("../common/Button"));
const CustomText = lazy(() => import("../common/Text"));

interface WishListRowItemProps {
  wishlistData:  ProductDataProps[];
  image: string;
  itemTitle: string;
  itemdesc?: string;
  price: string;
  removeItemFromCart: (id: string) => void;
  isCheckOut?: boolean;
  id: string;
}

const WishListRowItem: React.FC<WishListRowItemProps> = ({
  wishlistData,
  image,
  itemTitle,
  itemdesc,
  price,
  
  removeItemFromCart,
  isCheckOut = false,
  id,
}) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(selectCart)
  const addItemToCart = (id: string) => {
    const cartProduct = wishlistData.find((w) => w.$id === id);
    if(cartProduct){

      const cart: cartProps = {
        item: {...cartProduct, subtotal: 0, total: 0},
        qty: 1,
      };
      cart && dispatch(addToCart(cart));
    }
  };
  return (
    <div className="grid grid-cols-[33%_34%_33%] md:grid-cols-[20%_30%_30%_20%] gap-3 my-3 pb-2 border-b border-gray-300">
      <div
        className={` h-auto ${
          isCheckOut ? "bg-[#f4f4f4]" : "bg-white"
        } flex justify-center items-center p-2 rounded-xl`}
      >
        <img src={image} alt="item in wishlist" className="w-full h-auto" />
      </div>
      <div className="m-auto ">
        <CustomText text={itemTitle} textType="normal" weightType="semibold" />
        <CustomText
          text={itemdesc ?? ""}
          textType="small"
          weightType="normal"
          extraStyle="text-gray-500 mt-2"
        />
        <CustomText text={price} textType="normal" weightType="bold" />
      </div>
    { cart && Array.isArray(cart) && cart.find((c) => c.item.$id === id)?.item.$id === id ? (
      <></>
    ) : <div className="hidden md:block md:w-max m-auto">
        <CustomButton
          text="Add To Cart"
          textSize="normal"
          weightType="semibold"
          borderRadiusType="threecurved"
          showIcon={true}
          PreFixIcon={ShoppinCart}
          onClick={() => addItemToCart(id)}
        />
      </div>}

      <div
        onClick={() => removeItemFromCart(id)}
        className="hidden md:block md:w-max m-auto"
      >
        {isCheckOut ? (
          <Trash className={`w-4 h-4`} />
        ) : (
          <CustomButton
            text="Remove"
            textSize="normal"
            weightType="semibold"
            borderRadiusType="allcurved"
            showIcon={true}
            PreFixIcon={Trash}
            defaultBackgroundColor="bg-red-500"
          />
          // <IconAndText text="Remove" Icon={Trash} />
        )}
      </div>
      {/* for mobile device  */}
      <div className="md:hidden mx-auto my-auto">
      { cart && Array.isArray(cart) && cart.find((c) => c.item.$id === id)?.item.$id === id ? (
      <></>
    ) : (<div onClick={() => addItemToCart(id)} className="md:w-max m-auto pb-4">
          <IconAndText text="Add" Icon={ShoppinCart} fillColor="text-amber-500" textColor="text-amber-500"  />
      </div>)
      }

        <div onClick={() => removeItemFromCart(id)} className="">
          <IconAndText text="Remove" Icon={Trash} fillColor="text-red-500" textColor="text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default WishListRowItem;
