import { lazy } from "react";
const TwoTextSpan = lazy(() =>import("../../components/home/TwoTextSpan"));
const ProductCard = lazy(() =>import("../../components/product/ProductCard"));
import { CommonProductProps } from "./Category";
import {  navToAllProduct } from "../../helpers/productFuncHelper";

const TopSelling: React.FC<CommonProductProps> = ({ navigate, allProduct}) => {


  return (
    <section className="border-b border-black mb-2 pb-4 animate-on-scroll px-4 sm:px-0">
      <TwoTextSpan leftText="Top Selling" onClick={() => navToAllProduct(navigate)} />

      <article className="flex items-center lg:grid lg:grid-cols-7 gap-4 overflow-x-auto mx-2 lg:mx-0">
        {allProduct &&
          Array.isArray(allProduct) &&
          allProduct.map((item) => (
            <ProductCard key={item.$id} item={item} />
          ))}
      </article>
    </section>
  );
};

export default TopSelling;
