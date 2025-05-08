import { lazy } from "react";
import { handleHomeNavToProductDetails, navToAllProduct } from "../../helpers/productFuncHelper";
import { CommonProductProps } from "./Category";
const TwoTextSpan = lazy(() =>import("../../components/home/TwoTextSpan"));
const ProductCard = lazy(() =>import("../../components/product/ProductCard"));



const Recommendation: React.FC<CommonProductProps> = ({ navigate, allProduct}) => {

  const recommendedProducts = allProduct && Array.isArray(allProduct) && allProduct.filter((p) => {
   return p.name.length < 14
  }).slice(0, 7)
 
  return (
    <section className="border-b border-black mb-2 pb-4 animate-on-scroll">
      <TwoTextSpan leftText="Recommendations"  onClick={() => navToAllProduct(navigate)} />

      <article className="flex items-center lg:grid lg:grid-cols-7 gap-2 overflow-x-auto mx-2 lg:mx-0">
        {recommendedProducts && Array.isArray(recommendedProducts) && recommendedProducts.map((item, index) => (
          <div onClick={() =>{item && item.$id && handleHomeNavToProductDetails(navigate, item.$id)}} className="cursor-pointer" key={index}>
           <ProductCard item={item} />
          </div>
        ))}
      </article>
    </section>
  );
};

export default Recommendation;
