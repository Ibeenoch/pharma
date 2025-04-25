import cartImg from "../../assets/images/anti11.png";
import CustomText from "../../components/common/Text";
import SingleProduct from "../../components/product/SingleProduct";
import SingleCategoryItem from "../../components/product/SingleCategoryItem";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectproductAdmin } from "../admin/product/productSlice";
import {
  CartProductDataProps,
  cartProps,
} from "../../types/product/ProductData";
import { addToCart, addTowishlist } from "../cart/cartSlice";

const AllProductList = () => {
  const dispatch = useAppDispatch();

  const { productAdmin } = useAppSelector(selectproductAdmin);

  const handleAddToCart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const productItem = productAdmin.find((item) => item.$id === id)!;
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
    const productItem = productAdmin.find((item) => item.$id === id)!;
    const wishList = { item: productItem };
    dispatch(addTowishlist(wishList));
  };

  return (
    <main
      className={`block mt-20 mb-1 md:grid md:grid-cols-[20%_80%] h-full gap-2`}
    >
      {/* for mobile device */}
      <section className="md:hidden overflow-x-auto">
        <CustomText
          text="Product Categories"
          textType="medium"
          weightType="bold"
          extraStyle="border-b border-black w-max mx-auto"
        />
        <div className="flex gap-2 items-center m-2">
          <p className="text-xs font-normal text-white bg-black flex justify-center items-cennter p-2 w-max rounded-lg">
            All
          </p>
          <p className="text-xs font-normal text-white bg-gray-500 flex justify-center items-cennter p-2 w-max rounded-lg">
            Pain Killers
          </p>
        </div>
      </section>
      {/* for large screen size  */}
      <section className="hidden md:block p-4 bg-white">
        <div>
          <CustomText
            text="Product Categories"
            textType="medium"
            weightType="bold"
            extraStyle="border-b border-black w-max"
          />
          {/* product category  */}
          <SingleCategoryItem name="Skin Care" />
          <SingleCategoryItem name="Fever And Pain" />
        </div>
      </section>
      <section className="pt-4">
        <div className="grid p-2 grid-cols-2 md:grid-cols-3 gap-4">
          {/* map through cart item  */}
          {productAdmin.map(
            (p) =>
              p &&
              p.$id && (
                <SingleProduct
                  id={p.$id}
                  onAddCart={handleAddToCart}
                  onAddWishlist={handleAddToWishList}
                  productImage={p.imagesUrl[0]}
                  textTitle={p.name}
                  textDesc={
                    p.description.length > 80
                      ? p.description.slice(0, 80) + "..."
                      : p.description
                  }
                  price={`₦${p.price}`}
                />
              )
          )}
        </div>
      </section>
    </main>
  );
};

export default AllProductList;
