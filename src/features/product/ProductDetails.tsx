import { MARGIN_TOP } from "../../constants/appText";
import img3 from "../../assets/images/reco4.png";
import LargeImageSize from "../../components/common/LargeImageSize";
import PreviewImage from "../../components/common/PreviewImage";
import CustomText from "../../components/common/Text";
import Clock from "../../assets/icons/clock.svg?react";
import Quantity from "../../assets/icons/product.svg?react";
import CustomButton from "../../components/common/Button";
import Heart from "../../assets/icons/heart.svg?react";
import Cart from "../../assets/icons/cart-fill-white.svg?react";
import SingleProduct from "../../components/product/SingleProduct";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectproductAdmin } from "../admin/product/productSlice";
import IconShowList from "../../components/product/IconShowList";
import { addToCart, addTowishlist } from "../cart/cartSlice";
import { cartProps } from "../../types/product/ProductData";
import QtyProductUpdateBtn from "../../components/product/QtyProductUpdateBtn";

const ProductDetails = () => {
  const [qty, setQty] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { productAdmin } = useAppSelector(selectproductAdmin);
  const productItem = productAdmin.find((item) => item.$id === id)!;
  const product: cartProps = { item: productItem, qty: 1 };

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

  const addItemToCart = (id: number) => {
    if (id) {
      product.qty = id;
    }
    console.log("addItemToCart ", product);
    product && dispatch(addToCart(product));
  };

  const addItemToWishList = (id: number) => {
    if (id) {
      product.qty = id;
    }
    console.log("addItemTowishlist ", product);
    product && dispatch(addTowishlist(product));
  };
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
              product.item.imagesUrl &&
              product.item.imagesUrl.map((img, index) => (
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
            text="12 Self-dissolving tablets"
            textType="small"
            weightType="thin"
            extraStyle="text-gray-500 mb-3"
          />

          <div className="flex items-center justify-between pr-2">
            <CustomText
              text={`₦${
                product &&
                product.item &&
                product.item.price &&
                (product.item.price * qty).toFixed(2)
              }`}
              textType="large"
              weightType="semibold"
              color="text-amber-500"
            />

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
            text={product && product.item && product.item.description}
            textType="small"
            weightType="thin"
            extraStyle="text-gray-500 my-5"
          />

          <CustomText
            text={product && product.item && product.item.additionalInfo}
            textType="small"
            weightType="thin"
            extraStyle="text-gray-500 my-5"
          />
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

          <div className="grid grid-cols-[10%_90%] gap-4 my-3">
            <div
              onClick={() => addItemToWishList(qty)}
              className="group hover:bg-black cursor-pointer flex justify-center items-center border border-black rounded-2xl"
            >
              <Heart className="w-4 h-4 stroke-black fill-black group-hover:stroke-white group-hover:fill-white" />
            </div>
            <CustomButton
              text="Buy Now"
              textSize="small"
              weightType="semibold"
              borderRadiusType="threecurved"
              showIcon={true}
              BtnIcon={Cart}
              onClick={() => addItemToCart(qty)}
            />
          </div>
        </div>
      </section>
      <section className="my-3">
        <CustomText
          text="You May Also Like"
          textType="large"
          weightType="semibold"
          extraStyle="my-3"
        />

        <div className="flex items-center gap-2">
          <SingleProduct
            productImage={img3}
            price="₦4,100"
            textTitle="Procold"
            textDesc="Relieves Cold, flu symptoms, nasal congestion, and fever"
          />
          <SingleProduct
            productImage={img3}
            price="₦4,100"
            textTitle="Procold"
            textDesc="Relieves Cold, flu symptoms, nasal congestion, and fever"
          />
          <SingleProduct
            productImage={img3}
            price="₦4,100"
            textTitle="Procold"
            textDesc="Relieves Cold, flu symptoms, nasal congestion, and fever"
          />
          <SingleProduct
            productImage={img3}
            price="₦4,100"
            textTitle="Procold"
            textDesc="Relieves Cold, flu symptoms, nasal congestion, and fever"
          />
          <SingleProduct
            productImage={img3}
            price="₦4,100"
            textTitle="Procold"
            textDesc="Relieves Cold, flu symptoms, nasal congestion, and fever"
          />
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
