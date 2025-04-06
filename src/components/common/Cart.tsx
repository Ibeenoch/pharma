import React from "react";

interface CartProps {
  displayShowCart: () => void;
  CartIcon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  >;
  cartItemsQty: number;
}
const Cart: React.FC<CartProps> = ({
  displayShowCart,
  CartIcon,
  cartItemsQty,
}) => {
  return (
    <div onClick={displayShowCart} className="relative cursor-pointer">
      <CartIcon className="w-6 h-6" />
      <span className=" absolute p-2 w-3 h-3 top-0 right-5 flex justify-center items-center rounded-full text-white text-[8px]">
        <span className="relative flex size-[15px]">
          <span className="absolute inline-flex animate-ping h-full w-full rounded-full bg-amber-500 opacity-75">
            {" "}
          </span>
          <span className="relative inline-flex size-[15px] rounded-full bg-amber-500 justify-center items-center">
            {cartItemsQty}
          </span>
        </span>
      </span>
    </div>
  );
};

export default Cart;
