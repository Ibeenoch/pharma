import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { searchedProductBrand, selectproductAdmin } from "../admin/product/productSlice";
import { CartProductDataProps, cartProps } from "../../types/product/ProductData";
import { addToCart, addTowishlist } from "../cart/cartSlice";
import NoResult from "../../components/admin/header/search/NoResult";
import CustomText from "../../components/common/Text";
import SingleProduct from "../../components/product/SingleProduct";

const Brand = () => {
  const { name } = useParams();
  let searchedBrand = decodeURIComponent(name || '');
  const { productSearched, productAdmin } = useAppSelector(selectproductAdmin)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(searchedBrand) dispatch(searchedProductBrand(searchedBrand));
  }, [searchedBrand])

    // add product to cart
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
    // add product to favorite
    const handleAddToWishList = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      const productItem = productAdmin.find((item) => item.$id === id)!;
      const wishList = { item: productItem };
      dispatch(addTowishlist(wishList));
    };

  useEffect(() => {
    // start the page from the top
    window.scrollTo(0,0)
  }, [])
  return (
    <main
      className={`block mt-20 mb-1 md:grid md:grid-cols-[20%_80%] h-full pb-5 gap-2`}
    >
      {/* for mobile device */}
      <section className="md:hidden overflow-x-auto">
        <CustomText
          text={`${name}`}
          textType="medium"
          weightType="bold"
          extraStyle=" w-max mx-auto my-3"
        />
       
      </section>
      {/* for large screen size  */}
      <section className="hidden md:block p-4 bg-white mt-2 rounded-md">
        <div className="w-48  break-words whitespace-normal">
          <CustomText
            text={`${name}`}
            textType="medium"
            weightType="bold"
          />
          {/* product category  */}
        </div>
      </section>
      <section className="">
          {/* map through cart item  */}
       {   productSearched && Array.isArray(productSearched) && productSearched.length > 0 ? 
       <div className="flex flex-wrap justify-center items-center lg:grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4">
        {  
           productSearched.map((p) => (
              <>
             { p && p.$id && p.discount &&  ( 
              <SingleProduct
              key={p.$id}
                id={p && p.$id}
                productImage={p && p.imagesUrl && p.imagesUrl[0]}
                textTitle={p && p.name}
                textDesc={p && p.description.slice(0, 15)}
                price={p && String(p.price)} 
                onAddCart={handleAddToCart}
                onAddWishlist={handleAddToWishList}
                discount={p.discount}         
                />
                )}
                </>
            )) }
        </div> : (
            <div className="mr-3  mt-2">
              <NoResult />
            </div>
            )
          }
      </section>
    </main>
  );
};

export default Brand;
