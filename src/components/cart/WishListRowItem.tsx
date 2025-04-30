import React from "react";
import CustomText from "../common/Text";
import Trash from "../../assets/icons/trash-filled.svg?react";
import IconAndText from "./IconAndText";
import QtyUpdateBtn from "../product/QtyUpdateBtn";
import CustomButton from "../common/Button";
import ShoppinCart from "../../assets/icons/cart-fill-white.svg?react";
import { CartProductDataProps, cartProps, ProductDataProps } from "../../types/product/ProductData";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { addToCart } from "../../features/cart/cartSlice";

interface WishListRowItemProps {
  wishlistData:  ProductDataProps[];
  image: string;
  itemTitle: string;
  itemdesc?: string;
  price: string;
  qty: number;
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
  qty,
  removeItemFromCart,
  isCheckOut = false,
  id,
}) => {
  const dispatch = useAppDispatch();
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
      <div className="hidden md:block md:w-max m-auto">
        <CustomButton
          text="Add To Cart"
          textSize="normal"
          weightType="semibold"
          borderRadiusType="threecurved"
          showIcon={true}
          PreFixIcon={ShoppinCart}
          onClick={() => addItemToCart(id)}
        />
      </div>

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
      <div className="md:hidden flex flex-col justify-around">
        

        <div onClick={() => removeItemFromCart(id)} className="">
          <IconAndText text="Remove" Icon={Trash} fillColor="red-500" />
        </div>
      </div>
    </div>
  );
};

export default WishListRowItem;
