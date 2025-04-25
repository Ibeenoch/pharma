import { useNavigate } from "react-router-dom";
import Cart from "../../assets/icons/cart-fill-white.svg?react";
import Fave from "../../assets/icons/heart-fill-3.svg?react";
import CustomText from "../common/Text";
import React from "react";

interface SingleProductProps {
  productImage: string;
  textTitle: string;
  textDesc: string;
  price: string;
  id: string;
  onAddCart: (e: React.MouseEvent, id: string) => void;
  onAddWishlist: (e: React.MouseEvent, id: string) => void;
}

const SingleProduct: React.FC<SingleProductProps> = ({
  productImage,
  textTitle,
  textDesc,
  price,
  id,
  onAddCart,
  onAddWishlist,
}) => {
  const navigate = useNavigate();
  const navigateProduct = (id: string) => {
    navigate(`/product_details/${id}`);
  };
  return (
    <div
      onClick={() => navigateProduct(id)}
      className="p-4 bg-white rounded-lg mx-auto cursor-pointer"
    >
      <div className="p-2 bg-[#fbfcf8] rounded-md">
        <img src={productImage} alt="cart image" className="w-48 h-auto" />
      </div>
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
            <span
              onClick={(e) => onAddWishlist(e, id)}
              className="p-2 bg-black text-white hover:bg-white hover:border hover:border-black rounded-full group"
            >
              <Fave className="w-3 h-3 group-hover:text-black" />
            </span>
            <span
              onClick={(e) => onAddCart(e, id)}
              className="p-2 bg-black text-white hover:bg-white hover:border hover:border-black rounded-full group"
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
