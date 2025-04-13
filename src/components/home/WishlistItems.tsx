import Cancel from "../../assets/icons/cancel-close.svg?react";
import CancelCircle from "../../assets/icons/trash-bin.svg?react";
import CustomText from "../common/Text";
import CustomButton from "../common/Button";
import { cartProps, ProductDataProps } from "../../types/product/ProductData";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import {
  removeAllItemsInwishlist,
  removeFromwishlist,
  selectCart,
  updateWishListIndex,
  updateWishListQty,
} from "../../features/cart/cartSlice";

interface WishListItemsProps {
  showwishList: boolean;
  hideShowwishList: () => void;
  product: cartProps[];
}

const WishListItems: React.FC<WishListItemsProps> = ({
  showwishList,
  hideShowwishList,
  product,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { wishlist } = useAppSelector(selectCart);

  const handleQtySelected = (
    e: React.ChangeEvent<HTMLSelectElement>,
    i: number
  ) => {
    // the qty of product they was on the wishList
    const selectedQty = parseInt(e.target.value);
    // the qty of product they was on the wishList
    dispatch(updateWishListQty(selectedQty));
    // the current wishList index
    dispatch(updateWishListIndex(i));
  };

  const handleRemoveFromwishList = (id: string, i: number) => {
    dispatch(removeFromwishlist(id));
    i === 0 && hideShowwishList();
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
          <CancelCircle className="ml-4 w-4 h-4 stroke-gray-400 cursor-pointer" />
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
          product.map((p, i) => (
            <div className="flex gap-1 items-center mb-2 pb-3 border-b border-gray-300">
              <div className="p-1 flex justify-center items-center ">
                <img
                  src={p && p.item && p.item.imagesUrl && p.item.imagesUrl[0]}
                  alt="wishList image"
                  className="w-10 h-10"
                />
              </div>
              <div>
                <CustomText
                  text={p && p.item && p.item.name}
                  textType="small"
                  weightType="thin"
                  extraStyle="w-25"
                />
              </div>
              <div
                onClick={() => {
                  p &&
                    p.item &&
                    p.item.$id &&
                    handleRemoveFromwishList(p && p.item && p.item.$id, i);
                }}
              >
                <CancelCircle className="ml-4 w-7 h-5 stroke-gray-400 cursor-pointer" />
              </div>
            </div>
          ))}
      </div>

      <div className="flex flex-col gap-3 w-max items-center mx-auto justify-center">
        <CustomButton
          text="View wishList"
          showArrow={true}
          textSize="normal"
          defaultBackgroundColor="bg-amber-500"
          fullwidth={true}
          onClick={viewWishListPage}
        />
      </div>
    </section>
  );
};

export default WishListItems;
