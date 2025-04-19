import React from "react";

interface WishListProps {
  displayShowWishList: () => void;
  WishListIcon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  >;
  WishListItemsQty: number;
}
const WishList: React.FC<WishListProps> = ({
  displayShowWishList,
  WishListIcon,
  WishListItemsQty,
}) => {
  return (
    <div onClick={displayShowWishList} className="relative cursor-pointer">
      <WishListIcon className="w-6 h-6" />
      <span className=" absolute p-2 w-3 h-3 top-0 right-4 flex justify-center items-center rounded-full text-white text-[8px]">
        <span className="relative flex size-[15px]">
          <span
            className={`absolute ${WishListItemsQty > 0 && "inline-flex animate-ping h-full w-full rounded-full bg-amber-500 opacity-75"}`}
          >
            {" "}
          </span>
          {WishListItemsQty > 0 && (
            <span className="relative inline-flex size-[15px] rounded-full bg-amber-500 justify-center items-center">
              {WishListItemsQty}
            </span>
          )}
        </span>
      </span>
    </div>
  );
};

export default WishList;
