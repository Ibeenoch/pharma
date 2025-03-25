import Cart from "../../assets/icons/cart-fill-3.svg?react";
import Fave from "../../assets/icons/heart-fill-3.svg?react";
import CustomText from "../common/Text";
import React from "react";

interface SingleProductProps {
  productImage: string;
  textTitle: string;
  textDesc: string;
  price: string;
}

const SingleProduct: React.FC<SingleProductProps> = ({
  productImage,
  textTitle,
  textDesc,
  price,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg mx-auto cursor-pointer">
      <img src={productImage} alt="cart image" className="w-full h-auto" />
      <div>
        <CustomText text={textTitle} textType="medium" weightType="bold" />
        <CustomText
          text={textDesc}
          textType="small"
          weightType="semibold"
          color="text-gray-400 my-2"
        />
        <div className="flex md:justify-between gap-2 md:gap-0 items-center">
          <CustomText text={price} textType="medium" weightType="bold" />
          <div className="flex gap-3 items-center">
            <span className="p-2 bg-black text-white hover:bg-white hover:border hover:border-black rounded-full group">
              <Fave className="w-4 h-4 group-hover:text-black" />
            </span>
            <span className="p-2 bg-black text-white hover:bg-white hover:border hover:border-black rounded-full group">
              <Cart className="w-4 h-4 group-hover:text-black" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
