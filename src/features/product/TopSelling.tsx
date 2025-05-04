import { lazy } from "react";
const TwoTextSpan = lazy(() =>import("../../components/home/TwoTextSpan"));
const ProductCard = lazy(() =>import("../../components/product/ProductCard"));
import { CommonProductProps } from "./Category";
import {  navToAllProduct } from "../../helpers/productFuncHelper";

const TopSelling: React.FC<CommonProductProps> = ({ navigate, productAdmin}) => {


  return (
    <section className="border-b border-black mb-2 pb-4 animate-on-scroll px-4 sm:px-0">
      <TwoTextSpan leftText="Top Selling" onClick={() => navToAllProduct(navigate)} />

      <article className="flex items-center lg:grid lg:grid-cols-7 gap-4 overflow-x-auto">
        {productAdmin &&
          Array.isArray(productAdmin) &&
          productAdmin.map((item) => (
            <ProductCard key={item.$id} item={item} />
          ))}
      </article>
    </section>
  );
};

export default TopSelling;
