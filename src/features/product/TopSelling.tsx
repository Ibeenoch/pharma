import { lazy } from "react";
const TwoTextSpan = lazy(() =>import("../../components/home/TwoTextSpan"));
const CustomText = lazy(() =>import("../../components/common/Text"));
import { CommonProductProps } from "./Category";
import { handleHomeNavToProductDetails, navToAllProduct } from "../../helpers/productFuncHelper";

const TopSelling: React.FC<CommonProductProps> = ({ navigate, productAdmin}) => {


  return (
    <section className="border-b border-black mb-2 pb-4 animate-on-scroll px-4 sm:px-0">
      <TwoTextSpan leftText="Top Selling" onClick={() => navToAllProduct(navigate)} />

      <article className="flex items-center lg:grid lg:grid-cols-7 gap-4 overflow-x-auto">
        {productAdmin &&
          Array.isArray(productAdmin) &&
          productAdmin.map((item, index) => (
            <div
              onClick={() =>{ item && item.$id && handleHomeNavToProductDetails(navigate, item.$id)}}
              className="cursor-pointer"
              key={index}
            >
              <div className="h-22 w-20 md:h-30 md:w-28 lg:h-38 lg:w-32 xl:h-48 xl:w-42 flex items-center justify-center rounded-xl p-2 bg-white mb-4">
                <img
                  src={item && item.imagesUrl && item.imagesUrl[0]}
                  alt="top selling"
                  className="w-46 h-auto object-fill"
                />
              </div>
              <article>
                {item && item.name && (
                  <CustomText
                    text={
                      item && item.name && item.name.length > 20
                        ? item.name.slice(0, 20) + "..."
                        : item.name
                    }
                    textType="small"
                    weightType="bold"
                    extraStyle="text-ellipsis"
                  />
                )}
                <div className="flex gap-3 items-center">
                  {item && item.price && (
                    <CustomText
                      text={`₦${String(
                        item &&
                          item.price &&
                          item.discount &&
                          item.price * (1 - item.discount / 100)
                      )}`}
                      textType="extrasmall"
                      weightType="bold"
                      color="text-amber-500"
                    />
                  )}
                  {item && item.price && (
                    <CustomText
                      text={`₦${String(item && item.price)}`}
                      textType="extrasmall"
                      weightType="bold"
                      color="gray"
                      extraStyle="line-through"
                    />
                  )}
                </div>
              </article>
            </div>
          ))}
      </article>
    </section>
  );
};

export default TopSelling;
