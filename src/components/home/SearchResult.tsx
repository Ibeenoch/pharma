import CustomText from "../common/Text";
import SingleProduct from "../product/SingleProduct";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectproductAdmin } from "../../features/admin/product/productSlice";
import {
  CartProductDataProps,
  cartProps,
} from "../../types/product/ProductData";
import { addToCart, addTowishlist } from "../../features/cart/cartSlice";

const SearchResult = () => {
  const dispatch = useAppDispatch();

  const { productSearched } = useAppSelector(selectproductAdmin);

  const handleAddToCart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const productItem = productSearched.find((item) => item.$id === id)!;
    const productCart: CartProductDataProps = {
      ...productItem,
      subtotal:
        productItem.price -
        productItem.price *
          (productItem.discount ? productItem.discount / 100 : 0),
      total:
        productItem.price -
        productItem.price *
          (productItem.discount ? productItem.discount / 100 : 0) +
        1500,
    };
    const product: cartProps = { item: productCart, qty: 1 };
    dispatch(addToCart(product));
  };
  const handleAddToWishList = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const productItem = productSearched.find((item) => item.$id === id)!;
    const wishList = { item: productItem };
    dispatch(addTowishlist(wishList));
  };
  return (
    <main className="mx-auto">
      <section
        className={`mt-16 mx-auto ${productSearched.length > 4 ? "h-full" : "h-screen"} w-full lg:w-[60%] p-4`}
      >
        <div className="p-2 bg-white">
          <CustomText
            text={`${productSearched.length} results found`}
            textType="normal"
            weightType="bold"
            extraStyle="text-center border-b border-gray-300 mb-2"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* map through cart item  */}
          {productSearched.map(
            (p) =>
              p &&
              p.$id && p.discount && (
                <SingleProduct
                  onAddCart={handleAddToCart}
                  onAddWishlist={handleAddToWishList}
                  productImage={p.imagesUrl[0]}
                  textTitle={p.name}
                  discount={p.discount}
                  id={p.$id}
                  textDesc={
                    p && p.description.length > 80
                      ? p.description.slice(0, 80) + "..."
                      : p.description
                  }
                  price={`₦${p.price - p.price * (p && p.discount ? p.discount / 100 : 0)}`}
                />
              )
          )}
        </div>
      </section>
    </main>
  );
};

export default SearchResult;
