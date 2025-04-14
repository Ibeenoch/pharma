import CustomText from "../../components/common/Text";
import Trash from "../../assets/icons/trash-bin.svg?react";
import Lock from "../../assets/icons/lock.svg?react";
import productImg1 from "../../assets/images/cc4.png";
import productImg2 from "../../assets/images/cc3.png";
import IconAndText from "../../components/cart/IconAndText";
import { useState } from "react";
import CartRowItem from "../../components/cart/CartRowItem";
import CustomButton from "../../components/common/Button";
import CartTwoText from "../../components/cart/CartTwoText";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  checkIfItemHasBeenAddedToWishlist,
  decreasewishlistQty,
  increasewishlistQty,
  removeFromwishlist,
  selectCart,
} from "./cartSlice";
import WishListRowItem from "../../components/cart/WishListRowItem";
import { cartProps } from "../../types/product/ProductData";

interface FaveProps {
  showCheckOutBtn?: boolean;
  isCheckOutPage?: boolean;
}

const Fave: React.FC<FaveProps> = ({
  showCheckOutBtn = true,
  isCheckOutPage = false,
}) => {
  const [qty, setQty] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector(selectCart);

  const increaseQty = (id: string) => {
    dispatch(increasewishlistQty(id));
  };
  const decreaseQty = (id: string) => {
    dispatch(decreasewishlistQty(id));
  };
  const removeItemFromWishlist = (id: string) => {
    dispatch(removeFromwishlist(id));
    dispatch(checkIfItemHasBeenAddedToWishlist(id))
  };
  return (
    <section
      className={`mt-20 h-min ${
        isCheckOutPage ? "bg-white" : "md:w-[70%] md:mx-auto"
      }  rounded-xl p-4`}
    >
      {wishlist === undefined || wishlist === null || wishlist.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <CustomText text="No Items has beed added to your favorite" />
        </div>
      ) : (
        <div className="flex justify-between items-center my-2">
          <CustomText
            text={isCheckOutPage ? "Review Your Cart" : "Shopping Cart"}
            textType="medium"
            weightType="semibold"
          />

          <IconAndText Icon={Trash} text="Remove all" />
        </div>
      )}
      {/* map throught the cart items  */}

      {wishlist &&
        Array.isArray(wishlist) &&
        wishlist.map(
          (w) =>
            w &&
            w.item &&
            w.item.$id && (
              <WishListRowItem
                wishlistData={wishlist}
                removeItemFromCart={() =>
                  w &&
                  w.item &&
                  w.item.$id &&
                  removeItemFromWishlist(w && w.item && w.item.$id)
                }
                image={w && w.item && w.item.imagesUrl && w.item.imagesUrl[0]}
                itemTitle={w && w.item && w.item.name}
                itemdesc="Size: 250ml"
                price={`₦${w && w.item && w.item.price}`}
                qty={w && w.item && w.item.quantity}
                decreaseQty={() => {
                  w &&
                    w.item &&
                    w.item.$id &&
                    decreaseQty(w && w.item && w.item.$id);
                }}
                increaseQty={() => {
                  w &&
                    w.item &&
                    w.item.$id &&
                    increaseQty(w && w.item && w.item.$id);
                }}
                isCheckOut={isCheckOutPage}
                id={w && w.item && w.item.$id}
              />
            )
        )}
    </section>
  );
};

export default Fave;
