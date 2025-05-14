import React from "react";
import Cart from "../../assets/icons/cart-fill-white.svg?react";
import Fave from "../../assets/icons/heart-fill-3.svg?react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectCart } from "../../features/cart/cartSlice";
import CustomText from "../common/Text";

interface SingleProductProps {
  productImage: string;
  textTitle: string;
  textDesc: string;
  price: string;
  discount: number;
  id: string;
  onAddCart: (e: React.MouseEvent, id: string) => void;
  onAddWishlist: (e: React.MouseEvent, id: string) => void;
}

const SingleProduct: React.FC<SingleProductProps> = ({
  productImage,
  textTitle,
  textDesc,
  price,
  discount,
  id,
  onAddCart,
  onAddWishlist,
}) => {
  const { cart, wishlist} = useAppSelector(selectCart);
  const navigateProduct = (id: string) => {
    window.open(`/product_details/${id}`, '_blank');
  };
  return (
    <div
      onClick={() => navigateProduct(id)}
      className="p-4 bg-white rounded-lg  md:mx-0 cursor-pointer"
    >
      <div className="p-2 bg-[#fbfcf8] rounded-md flex justify-center h-30 md:h-40  items-center">
        <img src={productImage} alt="cart image" className="w-25 md:w-25 h-auto" loading="lazy" />
      </div>
      <div>
        <div className="md:hidden">
           <CustomText text={textTitle && textTitle.length > 10 ? textTitle.slice(0, 10) + '...' : textTitle} textType="medium" weightType="bold" />
        </div>
        <div className="hidden lg:block">
           <CustomText text={textTitle.length > 18 ? textTitle.slice(0, 18) + '...' : textTitle} textType="medium" weightType="bold" extraStyle="" />
        </div>
        <CustomText
          text={textDesc}
          textType="extrasmall"
          weightType="medium"
          color="text-gray-400"
          extraStyle=" my-2 lg:max-w-60"
        />
        <div className="flex md:justify-between gap-2 md:gap-0 items-center">
          <div className="flex items-center gap-2">
            <CustomText text={'₦' + String((parseInt(price) - (((discount === 0 ? 1 : (discount / 100))) * parseInt(price))) )} textType="medium" weightType="bold" color="text-amber-500" />
            <div className="hidden lg:block">
              <CustomText text={`₦${price}`} textType="small" weightType="normal" color="text-gray-400" extraStyle="line-through px-2" />
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <span
              onClick={(e) => onAddWishlist(e, id)}
              className={`p-2 ${ wishlist && Array.isArray(wishlist) && wishlist.find((c) => c.$id === id)?.$id === id  ? 'bg-amber-500' : 'bg-black' } text-white hover:bg-white hover:border hover:border-black rounded-full group`}
            >
              <Fave className="w-3 h-3 group-hover:text-black" />
            </span>
            <span
              onClick={(e) => onAddCart(e, id)}
              className={`p-2 ${ cart && Array.isArray(cart) && cart.find((c) => c.item.$id === id)?.item.$id === id  ? 'bg-amber-500' : 'bg-black' } text-white hover:bg-white hover:border hover:border-black rounded-full group`}
            >
              <Cart className="w-4 h-4 group-hover:text-black" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
