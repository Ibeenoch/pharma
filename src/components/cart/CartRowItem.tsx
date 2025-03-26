import React from "react";
import CustomText from "../../components/common/Text";
import Trash from "../../assets/icons/trash-bin.svg?react";
import IconAndText from "../../components/cart/IconAndText";
import QtyUpdateBtn from "../../components/product/QtyUpdateBtn";

interface CartRowItemProps {
  image: string;
  itemTitle: string;
  itemdesc?: string;
  price: string;
  qty: number;
  decreaseQty: () => void;
  increaseQty: () => void;
}

const CartRowItem: React.FC<CartRowItemProps> = ({
  image,
  itemTitle,
  itemdesc,
  price,
  qty,
  decreaseQty,
  increaseQty,
}) => {
  return (
    <div className="grid grid-cols-[33%_34%_33%] md:grid-cols-[20%_30%_30%_20%] gap-3 my-3 pb-2 border-b border-gray-300">
      <div className=" h-auto bg-white flex justify-center items-center p-2 rounded-xl">
        <img src={image} alt="item in cart" className="w-full h-auto" />
      </div>
      <div className="m-auto ">
        <CustomText text={itemTitle} textType="medium" weightType="semibold" />
        <CustomText
          text={itemdesc ?? ""}
          textType="small"
          weightType="normal"
          extraStyle="text-gray-500 mt-2"
        />
        <CustomText text={price} textType="medium" weightType="bold" />
      </div>
      <div className="hidden md:block md:w-max m-auto">
        <QtyUpdateBtn
          decreaseNum={decreaseQty}
          increaseNum={increaseQty}
          qty={qty}
        />
      </div>

      <div className="hidden md:block md:w-max m-auto">
        <IconAndText text="Remove" Icon={Trash} />
      </div>
      {/* for mobile device  */}
      <div className="md:hidden flex flex-col justify-around">
        <div className="w-max ">
          <QtyUpdateBtn
            decreaseNum={decreaseQty}
            increaseNum={increaseQty}
            qty={qty}
          />
        </div>

        <div className="">
          <IconAndText text="Remove" Icon={Trash} fillColor="red-500" />
        </div>
      </div>
    </div>
  );
};

export default CartRowItem;
