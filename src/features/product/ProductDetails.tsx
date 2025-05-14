import { useState, lazy, useEffect } from "react";
import { MARGIN_TOP } from "../../constants/appText";
import Clock from "../../assets/icons/clock.svg?react";
import Quantity from "../../assets/icons/product.svg?react";
import Heart from "../../assets/icons/heart.svg?react";
import Cart from "../../assets/icons/cart-fill-white.svg?react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchSimilarProduct, selectproductAdmin } from "../admin/product/productSlice";
import Brand from '../../assets/icons/brand-unity3d.svg?react';
import Category from '../../assets/icons/category.svg?react';
import {
  addToCart,
  addTowishlist,
  calculateSubTotal,
  checkIfItemHasBeenAddedToCheck,
  checkIfItemHasBeenAddedToWishlist,
  decreaseCartQty,
  increaseCartQty,
  selectCart,
} from "../cart/cartSlice";
import {
  CartProductDataProps,
  cartProps,
  SimilarProductProps,
} from "../../types/product/ProductData";
import CustomText from "../../components/common/Text";
import CustomButton from "../../components/common/Button";
const LargeImageSize = lazy(() => import("../../components/common/LargeImageSize"));
const PreviewImage = lazy(() => import("../../components/common/PreviewImage"));
const SingleProduct = lazy(() => import("../../components/product/SingleProduct"));
const IconShowList = lazy(() => import("../../components/product/IconShowList"));
const QtyProductUpdateBtn = lazy(() => import("../../components/product/QtyProductUpdateBtn"));
const QtyUpdateBtn = lazy(() => import("../../components/product/QtyUpdateBtn"));

const ProductDetails = () => {
  const [qty, setQty] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { allProduct, productSimilar } = useAppSelector(selectproductAdmin);
  const { cart, wishlist, subTotal, total } = useAppSelector(selectCart);

  const productItem = allProduct.find((item) => item.$id === id)!;

  useEffect(() => {
    if(productItem && productItem.$id){
      const data: SimilarProductProps = {brand: productItem.brand, category: productItem.category, producTId: productItem.$id};
      dispatch(fetchSimilarProduct(data))
    }
  }, [])
  const productCart: CartProductDataProps = {
    ...productItem,
    subtotal: subTotal,
    total,
  };
  const product: cartProps = { item: productCart, qty: 1 };

  const [imgUrl, setImgUrl] = useState<string>(
    product && product.item && product.item.imagesUrl
      ? product.item.imagesUrl[0]
      : ""
  );

  const handleImgClick = (index: number) => {
    product &&
      product.item &&
      product.item.imagesUrl &&
      setImgUrl(
        product &&
          product.item &&
          product.item.imagesUrl &&
          (product.item.imagesUrl[index] as string)
      );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const addItemToCart = (id: number) => {
    // id number is the number of item qty to be added not the id itself
    if (id) {
      product.qty = id;
    }
    product && dispatch(addToCart(product));
    dispatch(calculateSubTotal());
    if (product && product.item && product.item && product.item.$id)
      dispatch(
        checkIfItemHasBeenAddedToCheck(
          product && product.item && product.item && product.item.$id
        )
      );
  };

  // const hasProduct

  const addItemToWishList = (id: number) => {
    if (id) {
      product.qty = id;
    }
    product && dispatch(addTowishlist(product));
    if (product && product.item && product.item && product.item.$id)
      dispatch(
        checkIfItemHasBeenAddedToWishlist(
          product && product.item && product.item && product.item.$id
        )
      );
  };

  const decreaseQty = (id: string) => {
    dispatch(decreaseCartQty(id));
    dispatch(calculateSubTotal());
  };

  const increaseQty = (id: string) => {
    dispatch(increaseCartQty(id));
    dispatch(calculateSubTotal());
  };

  // similar products
  const handleAddToCart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const productItem = allProduct.find((item) => item.$id === id)!;
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
    const productItem = allProduct.find((item) => item.$id === id)!;
    const wishList = { item: productItem };
    dispatch(addTowishlist(wishList));
  };
  const cartItem =
    cart &&
    Array.isArray(cart) &&
    cart.find((c) => c && c.item && c.item.$id === product.item.$id);
  const wishListItem =
    wishlist &&
    Array.isArray(wishlist) &&
    wishlist.find((c) => c && c.$id === product.item.$id);
  return (
    <>
      <section
        className={`${MARGIN_TOP}  md:grid grid-cols-2  mb-1 border-b border-gray-300`}
      >
        <div className="relative">
          <LargeImageSize img={imgUrl} extraStyle="max-h-[550px]" />
          <div className="flex  md:block md:absolute md:top-0 md:left-0 lg:mt-6">
            {/* preview images */}

            {product &&
              product.item &&
              product.item.imagesUrl && Array.isArray(product.item.imagesUrl) &&
              product.item.imagesUrl.filter((p) => p !== undefined).map((img, index) => (
                <div onClick={() => handleImgClick(index)}>
                  <PreviewImage img={img} />
                </div>
              ))}
          </div>
        </div>

        <div className="mt-5 p-4">
          <CustomText
            text={product && product.item && product.item.name}
            textType="large"
            weightType="medium"
          />
          <CustomText
            text={product && product.item && product.item.category}
            textType="small"
            weightType="thin"
            extraStyle="text-gray-500 mb-3"
          />

          <div className="flex items-center justify-between pr-2">
            <div className="flex items-center gap-2 ">
              {product &&
              product.item &&
              product.item.price &&
              product.item.discount ? (
                // if there is a discount show this
                <CustomText
                  text={`₦${
                    product &&
                    product.item &&
                    product.item.price &&
                    product.item.discount &&
                    (
                      (product.item.price -
                        ((product.item.discount / 100) * product.item.price)) *
                      qty
                    ).toFixed(2)
                  } `}
                  textType="large"
                  weightType="semibold"
                  color="text-amber-500"
                />
              ) : (
                <CustomText
                  text={`₦${
                    product &&
                    product.item &&
                    product.item.price &&
                    (product.item.price * qty).toFixed(2)
                  } `}
                  textType="large"
                  weightType="semibold"
                  color="text-amber-500"
                />
              )}
              <CustomText
                text={`₦${
                  product &&
                  product.item &&
                  product.item.price &&
                  (product.item.price * qty).toFixed(2)
                }`}
                textType="normal"
                weightType="medium"
                color="text-gray-400"
                extraStyle={`${
                  product && product.item && product.item.discount
                    ? "line-through"
                    : ""
                }`}
              />
            </div>

            <div className="text-center">
              <QtyProductUpdateBtn
                qty={qty}
                decreaseNum={() => {
                  setQty((prev) => (prev <= 1 ? 1 : prev - 1));
                }}
                increaseNum={() => {
                  setQty((prev) => prev + 1);
                }}
              />
              <CustomText
                text="Quantity"
                textType="small"
                color="text-gray-500"
                extraStyle="pt-2"
              />
            </div>
          </div>

          <CustomText
            text='Product Details'
            textType="normal"
            weightType="semibold"
            extraStyle="pt-4"
          />
          <CustomText
            text={product && product.item && product.item.description}
            textType="small"
            weightType="thin"
            extraStyle="text-gray-500 my-2"
          />

    {product && product.item && product.item.additionalInfo && product.item.additionalInfo.length > 0 &&
     (      <CustomText
            text='Additional Information'
            textType="normal"
            weightType="semibold"
          />)}
          <CustomText
            text={product && product.item && product.item.additionalInfo}
            textType="small"
            weightType="thin"
            extraStyle="text-gray-500 my-2"
          />
          <div className="block md:grid grid-cols-2">

            <IconShowList
              Icon={Clock}
              topText="Delivery time"
              bottomText="6 - 8 hours"
            />
            {product && product.item && product.item.quantity && (
              <IconShowList
                Icon={Quantity}
                topText="Stock Left"
                bottomText={
                  product && product.item && String(product.item.quantity)
                }
              />
            )}

            <IconShowList
              Icon={Category}
              topText='Category'
              bottomText={product && product.item && product.item.category}
            />
            <IconShowList
              Icon={Brand}
              topText='Brand'
              bottomText={product && product.item && product.item.brand}
            />
          </div>

          <div className={`grid grid-cols-[10%_90%] gap-4 my-3`}>
            {wishListItem &&
            wishListItem.$id === id ? (
              <div></div>
            ) : (
              <div
                onClick={() => addItemToWishList(qty)}
                className="group hover:bg-black cursor-pointer flex justify-center items-center border border-black rounded-full md:rounded-2xl"
              >
                <Heart className="w-4 h-4 stroke-black fill-black group-hover:stroke-white group-hover:fill-white" />
              </div>
            )}

            {cartItem && cartItem.item && cartItem.item.$id === id ? (
              <div>
                {product && product.item && product.item.$id && (
                  <QtyUpdateBtn
                    isCheckOutPage={false}
                    isProductdescPage={true}
                    decreaseNum={() => {
                      product &&
                        product.item &&
                        product.item.$id &&
                        decreaseQty(
                          product && product.item && product.item.$id
                        );
                    }}
                    increaseNum={() => {
                      product &&
                        product.item &&
                        product.item.$id &&
                        increaseQty(
                          product && product.item && product.item.$id
                        );
                    }}
                    qty={cartItem && cartItem.qty ? cartItem.qty : 1}
                    id={product && product.item && product.item.$id}
                    size="big"
                  />
                )}
              </div>
            ) : (
              <CustomButton
                text="Buy Now"
                textSize="small"
                weightType="semibold"
                borderRadiusType="threecurved"
                showIcon={true}
                BtnIcon={Cart}
                onClick={() => addItemToCart(qty)}
                className="mx-2 sm:mx-0"
              />
            )}
          </div>
        </div>
      </section>
      <section className="my-3">
        <CustomText
          text="You May Also Like"
          textType="large"
          weightType="semibold"
          extraStyle="my-3 px-2 lg:px-0"
        />

        <div className="flex items-center gap-2 overflow-x-auto px-2 lg:px-0">
          {
            productSimilar && Array.isArray(productSimilar) && productSimilar.map((p) => (

            p && p.$id && p.discount &&
            <SingleProduct
                onAddCart={handleAddToCart}
                onAddWishlist={handleAddToWishList}
                id={p.$id}
                discount={p.discount}
                productImage={p.imagesUrl[0]}
                price={`${p.price}`}
                textTitle={p.name}
                textDesc={p.description.slice(0, 50)}
                key={p.$id}
              />
            ))
          }
       
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
