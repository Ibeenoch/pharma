import CustomText from "../../components/common/Text";
import TwoTextSpan from "../../components/home/TwoTextSpan";
import { productBrands } from "../../utils/admin/product/productList";
import { NavigateFunction } from "react-router-dom";
import React from "react";

interface BrandsProps{
  navigate: NavigateFunction;
}

const Brands:React.FC<BrandsProps> = ({ navigate }) => {

  const handleNavBrand = (name: string) => {
    navigate(`/brand/${name}`)
  }

  return (
    <section className="border-b border-black mx-2 sm:mx-0 mb-2 pb-4 animate-on-scroll">
      <TwoTextSpan leftText="Top Brands" />

      <article className="flex items-center lg:grid grid-cols-2 lg:grid-cols-7 gap-4 overflow-x-auto mx-2 lg:mx-0">
        {productBrands.slice(1).map((item, index) => (
          <div onClick={() => handleNavBrand(item.label)} className="cursor-pointer" key={index}>
            <div className="h-40 w-30 lg:h-40 lg:w-32 xl:h-48 xl:w-42 flex items-center justify-center rounded-xl p-2 bg-white mb-4">
              <img
                src={item.companyImage}
                alt="medication categories"
                className="w-46 h-auto object-fill bg-white"
              />
            </div>
            <article>
              <CustomText
                text={item && item.label && item.label.length > 18 ? item.label.slice(0,18) + '...' :item.label}
                textType="small"
                weightType="bold"
              />
            </article>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Brands;
