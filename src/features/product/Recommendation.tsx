import { lazy } from "react";
const TwoTextSpan = lazy(() =>import("../../components/home/TwoTextSpan"));
const CustomText = lazy(() =>import("../../components/common/Text"));
import { handleHomeNavToProductDetails, navToAllProduct } from "../../helpers/productFuncHelper";
import { CommonProductProps } from "./Category";



const Recommendation: React.FC<CommonProductProps> = ({ navigate, productAdmin}) => {

  const recommendedProducts = productAdmin && Array.isArray(productAdmin) && productAdmin.filter((p) => {
   return p.name.length < 14
  }).slice(0, 14)
 
  return (
    <section className="border-b border-black mb-2 pb-4 animate-on-scroll">
      <TwoTextSpan leftText="Recommendations"  onClick={() => navToAllProduct(navigate)} />

      <article className="flex items-center lg:grid lg:grid-cols-7 gap-4 overflow-x-auto">
        {recommendedProducts && Array.isArray(recommendedProducts) && recommendedProducts.map((item, index) => (
          <div onClick={() =>{item && item.$id && handleHomeNavToProductDetails(navigate, item.$id)}} className="cursor-pointer" key={index}>
            <div className="h-22 w-20 md:h-30 md:w-28 lg:h-38 lg:w-32 xl:h-48 xl:w-42 flex items-center justify-center rounded-xl p-2 bg-white mb-4">
              <img
                src={item && item.imagesUrl && item.imagesUrl[0]}
                alt="medication categories"
                className="w-46 h-auto object-fill"
              />
            </div>
            <article>
                <CustomText
                  text={item && item.name}
                  textType="small"
                  weightType="bold"
                  extraStyle="text-ellipsis"
                />
              <div className="flex gap-3 items-center">
              
                  <CustomText
                    text={`₦${item && item.discount && item.price && (item.price - ((item.discount / 100) * item.price))}`}
                    textType="extrasmall"
                    weightType="bold"
                    color="text-amber-500"
                  />
                  <CustomText
                    text={`₦${item && item.price}`}
                    textType="extrasmall"
                    weightType="bold"
                    color="gray"
                    extraStyle="line-through"
                  />
              </div>
            </article>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Recommendation;
