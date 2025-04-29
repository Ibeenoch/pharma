import { lazy } from "react";
const TwoTextSpan = lazy(() =>import("../../components/home/TwoTextSpan"));
const CustomText = lazy(() =>import("../../components/common/Text"));
import { CommonProductProps } from "./Category";
import { handleHomeNavToProductDetails, navToAllProduct } from "../../helpers/productFuncHelper";

const HotDeals: React.FC<CommonProductProps> = ({ navigate, productAdmin }) => {
  
  const hotDealsProduct = productAdmin && Array.isArray(productAdmin)
  ? productAdmin
      .filter((p) => p.isHotDeal) // Only products with isHotDeal truthy
      .sort((a, b) => (b.isHotDeal ?? 0) - (a.isHotDeal ?? 0)) // Sort from highest to lowest isHotDeal
      .map((p) => {
        return {name: p.name, image: p.imagesUrl[0], id: p.$id, price: p.price, discount: p.discount}
      }).slice(0, 7)
  : [];


  return (
    <section className="border-b border-black mb-2 pb-4 animate-on-scroll">
      <TwoTextSpan leftText="Hot Deals"  onClick={() => navToAllProduct(navigate)} />

      <article className="flex items-center lg:grid lg:grid-cols-7 gap-4 overflow-x-auto">
        {hotDealsProduct && Array.isArray(hotDealsProduct) && hotDealsProduct.map((item, index) => (
          <div onClick={() =>{item && item.id && handleHomeNavToProductDetails(navigate, item.id)}} className="cursor-pointer relative" key={index}>
            <div className="h-22 w-20 md:h-30 md:w-28 lg:h-38 lg:w-32 xl:h-48 xl:w-42 flex items-center justify-center rounded-xl p-2 bg-white mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-46 h-auto object-fill"
              />
            </div>
            <article>
                <CustomText
                  text={item.name}
                  textType="small"
                  weightType="bold"
                  extraStyle="text-ellipsis"
                />
              <div className="flex gap-3 items-center">
                  <CustomText
                    text={`₦${item && item.price && item.discount && String((item.price - ((item.discount/100) * item.price)))}`}
                    textType="extrasmall"
                    weightType="bold"
                    color="text-amber-500"
                  />
                  <CustomText
                    text={`₦${String(item.price)}`}
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

export default HotDeals;
