import CustomText from "../../components/common/Text";
import Trash from "../../assets/icons/trash-bin.svg?react";
import Lock from "../../assets/icons/lock.svg?react";
import productImg1 from "../../assets/images/cc4.png";
import productImg2 from "../../assets/images/cc3.png";
import IconAndText from "../../components/cart/IconAndText";
import { useEffect, useState } from "react";
import CartRowItem from "../../components/cart/CartRowItem";
import CustomButton from "../../components/common/Button";
import CartTwoText from "../../components/cart/CartTwoText";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  checkIfItemHasBeenAddedToWishlist,
  removeAllItemsInwishlist,
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


  const removeItemFromWishlist = (id: string) => {
    dispatch(removeFromwishlist(id));
    dispatch(checkIfItemHasBeenAddedToWishlist(id))
  };

  const clearWishList = () => {
    dispatch(removeAllItemsInwishlist())
  }


    useEffect(() => {
      // start the page from the top when a user visit the page
      window.scrollTo(0,0)
    },[])

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
            text={isCheckOutPage ? "Review Your Cart" : "Favorite"}
            textType="medium"
            weightType="semibold"
          />
          <div onClick={clearWishList}>
            <IconAndText  Icon={Trash} text="Remove all" />
          </div>
        </div>
      )}
      {/* map throught the cart items  */}

      {wishlist &&
        Array.isArray(wishlist) &&
        wishlist.map(
          (w) =>
            w &&
            w &&
            w.$id && (
              <WishListRowItem
                wishlistData={wishlist}
                removeItemFromCart={() =>
                  w &&
                  w &&
                  w.$id &&
                  removeItemFromWishlist(w && w && w.$id)
                }
                image={w && w && w.imagesUrl && w.imagesUrl[0]}
                itemTitle={w && w && w.name}
                itemdesc="Size: 250ml"
                price={`₦${w && w && w.price}`}
                qty={w && w && w.quantity}
                isCheckOut={isCheckOutPage}
                id={w && w && w.$id}
              />
            )
        )}
    </section>
  );
};

export default Fave;
