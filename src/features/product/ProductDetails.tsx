import { MARGIN_TOP } from "../../constants/appText";
import img from "../../assets/images/anti18.png";
import img2 from "../../assets/images/anti17.png";
import img3 from "../../assets/images/reco4.png";
import LargeImageSize from "../../components/common/LargeImageSize";
import PreviewImage from "../../components/common/PreviewImage";
import CustomText from "../../components/common/Text";
import Clock from "../../assets/icons/clock.svg?react";
import CustomButton from "../../components/common/Button";
import Heart from "../../assets/icons/heart.svg?react";
import Cart from "../../assets/icons/cart-fill-white.svg?react";
import SingleProduct from "../../components/product/SingleProduct";
import { useState } from "react";
import QtyUpdateBtn from "../../components/product/QtyUpdateBtn";

const ProductDetails = () => {
  const [qty, setQty] = useState<number>(1);

  const increaseNum = () => setQty(qty + 1);
  const decreaseNum = () => setQty((prev) => Math.max(1, prev - 1));
  return (
    <>
      <section
        className={`${MARGIN_TOP}  md:grid grid-cols-2  mb-1 border-b border-gray-300`}
      >
        <div className="relative">
          <LargeImageSize img={img} extraStyle="max-h-[550px]" />
          <div className="flex  md:block md:absolute md:top-0 md:left-0 lg:mt-6">
            {/* preview images */}
            <PreviewImage img={img} />
            <PreviewImage img={img2} />
            <PreviewImage img={img} />
            <PreviewImage img={img2} />
            <PreviewImage img={img} />
            <PreviewImage img={img2} />
          </div>
        </div>

        <div className="mt-5 p-4">
          <CustomText
            text="Emzor Ibuprofen Soluble"
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
              text="₦1350.90"
              textType="large"
              weightType="semibold"
              color="text-amber-500"
            />

            <QtyUpdateBtn
              qty={qty}
              decreaseNum={decreaseNum}
              increaseNum={increaseNum}
            />
          </div>

          <CustomText
            text="Suitable for adults, the elderly, and children aged 12 and above, take two tablets initially, then 1-2 tablets if necessary, dissolving them in water before consumption. For best results, the solution should be consumed immediately after dissolving, preferably after a meal to minimize any potential stomach discomfort. It is important to adhere to the recommended dosage and avoid exceeding the prescribed limit to prevent any adverse effects. Individuals with underlying health conditions, such as ulcers or kidney issues, should consult a healthcare professional before use. If symptoms persist despite taking the medication, seeking medical advice is advisable. Store in a cool, dry place away from direct sunlight, and keep out of reach of children."
            textType="small"
            weightType="thin"
            extraStyle="text-gray-500 my-5"
          />

          <div className="flex items-center gap-2">
            <div className="bg-white p-2 flex justify-center items-center rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <CustomText
                text="Delivery time"
                textType="small"
                weightType="thin"
                extraStyle="text-gray-500"
              />
              <CustomText
                text="6 - 8 hours"
                textType="small"
                weightType="thin"
                extraStyle=""
              />
            </div>
          </div>

          <div className="grid grid-cols-[10%_90%] gap-4 my-3">
            <div className="group hover:bg-black cursor-pointer flex justify-center items-center border border-black rounded-2xl">
              <Heart className="w-4 h-4 stroke-black fill-black group-hover:stroke-white group-hover:fill-white" />
            </div>
            <CustomButton
              text="Buy Now"
              textSize="small"
              weightType="semibold"
              borderRadiusType="threecurved"
              showIcon={true}
              BtnIcon={Cart}
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
