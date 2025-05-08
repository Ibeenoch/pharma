import { lazy } from "react";
import Cancel from "../../assets/icons/cancel-close.svg?react";
import CancelCircle from "../../assets/icons/trash-bin.svg?react";
import { ProductDataProps } from "../../types/product/ProductData";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import {
  removeAllItemsInwishlist,
  removeFromwishlist,
  selectCart,
} from "../../features/cart/cartSlice";
const CustomText = lazy(() =>import("../../components/common/Text"));
const CustomButton = lazy(() =>import("../common/Button"));

interface WishListItemsProps {
  showwishList: boolean;
  hideShowwishList: () => void;
  product: ProductDataProps[];
}

const WishListItems: React.FC<WishListItemsProps> = ({
  showwishList,
  hideShowwishList,
  product,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { wishlist } = useAppSelector(selectCart)

  const handleRemoveFromwishList = (id: string) => {
    dispatch(removeFromwishlist(id));
    wishlist.length === 1 && hideShowwishList();
  };

  const handleRemoveAllFromwishList = () => {
    dispatch(removeAllItemsInwishlist());
    hideShowwishList();
  };
  const viewWishListPage = () => {
    navigate("/wishlist");
  };

  return (
    <section
      className={`hidden ${
        showwishList ? "lg:block" : "lg:hidden"
      } absolute right-5 top-30 w-[250px] h-max bg-white p-4`}
    >
      <div
        className="flex justify-end cursor-pointer"
        onClick={hideShowwishList}
      >
        <Cancel className="w-5 h-5" />
      </div>

      <div className="border-b border-gray-300 mb-2 py-1 flex items-center justify-between">
        <CustomText text="Favorite" textType="normal" weightType="semibold" />
        <div
          onClick={handleRemoveAllFromwishList}
          className="flex items-center gap-1 cursor-pointer"
        >
          <CancelCircle className="ml-4 w-4 h-4 text-amber-500 cursor-pointer" />
          <CustomText
            text="Remove All"
            textType="extrasmall"
            weightType="medium"
          />
        </div>
      </div>

      <div>
        {/* wishList item  */}
        {product &&
          product.map((p) => (
            <div className="flex gap-1 items-center mb-2 pb-3 border-b border-gray-300">
              <div className="p-1 flex justify-center items-center ">
                <img
                  src={p && p.imagesUrl && p.imagesUrl[0]}
                  alt="wishList image"
                  className="w-10 h-10"
                />
              </div>
              <div>
                <CustomText
                  text={p && p && p.name}
                  textType="small"
                  weightType="thin"
                  extraStyle="w-25"
                />
              </div>
              <div
                onClick={() => {
                  p &&
                    p &&
                    p.$id &&
                    handleRemoveFromwishList(p && p && p.$id);
                }}
              >
                <CancelCircle className="ml-4 w-7 h-5 text-amber-500 cursor-pointer" />
              </div>
            </div>
          ))}
      </div>

      <div className="flex flex-col gap-3 w-max items-center mx-auto justify-center">
        <CustomButton
          text="View Favorite"
          showArrow={true}
          textSize="normal"
          defaultTextColor="text-white group-hover:text-amber-500"
          defaultArrowColor="fill-white group-hover:fill-amber-500"
          defaultBackgroundColor="bg-amber-500 hover:bg-white"
          defaultBorderColor="border border-amber-500"
          fullwidth={true}
          onClick={viewWishListPage}
        />
      </div>
    </section>
  );
};

export default WishListItems;
