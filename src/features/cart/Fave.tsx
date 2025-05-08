import { lazy, useEffect } from "react";
import Trash from "../../assets/icons/trash-bin.svg?react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  checkIfItemHasBeenAddedToWishlist,
  removeAllItemsInwishlist,
  removeFromwishlist,
  selectCart,
} from "./cartSlice";
const CustomText = lazy(() => import("../../components/common/Text"));
const IconAndText = lazy(() => import("../../components/cart/IconAndText"));
const WishListRowItem = lazy(() => import("../../components/cart/WishListRowItem"));

interface FaveProps {
  showCheckOutBtn?: boolean;
  isCheckOutPage?: boolean;
}

const Fave: React.FC<FaveProps> = ({
  isCheckOutPage = false,
}) => {
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
                isCheckOut={isCheckOutPage}
                id={w && w && w.$id}
              />
            )
        )}
    </section>
  );
};

export default Fave;
