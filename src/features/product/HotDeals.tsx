import { lazy } from "react";
import { CommonProductProps } from "./Category";
import { handleHomeNavToProductDetails, navToAllProduct } from "../../helpers/productFuncHelper";
const TwoTextSpan = lazy(() =>import("../../components/home/TwoTextSpan"));
const ProductCard = lazy(() =>import("../../components/product/ProductCard"));

const HotDeals: React.FC<CommonProductProps> = ({ navigate, allProduct }) => {
  
  const hotDealsProduct = allProduct && Array.isArray(allProduct)
  ? allProduct
      .filter((p) => p.isHotDeal) // Only products with isHotDeal truthy
      .sort((a, b) => (b.isHotDeal ?? 0) - (a.isHotDeal ?? 0)) // Sort from highest to lowest isHotDeal
     .slice(0, 7)
  : [];


  return (
    <section className="border-b border-black mb-2 pb-4 animate-on-scroll">
      <TwoTextSpan leftText="Hot Deals"  onClick={() => navToAllProduct(navigate)} />

      <article className="flex items-center lg:grid lg:grid-cols-7 gap-4 overflow-x-auto mx-2 lg:mx-0">
        {hotDealsProduct && Array.isArray(hotDealsProduct) && hotDealsProduct.map((item, index) => (
          <div onClick={() =>{item && item.$id && handleHomeNavToProductDetails(navigate, item.$id)}} className="cursor-pointer relative" key={index}>
            <ProductCard item={item} key={item.$id} />
          </div>
        ))}
      </article>
    </section>
  );
};

export default HotDeals;
