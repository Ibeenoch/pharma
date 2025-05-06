import { lazy } from "react";
const TwoTextSpan = lazy(() =>import("../../components/home/TwoTextSpan"));
const CustomText = lazy(() =>import("../../components/common/Text"));
import { NavigateFunction,  } from "react-router-dom";
import { ProductDataProps } from "../../types/product/ProductData";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setProductCategoryName } from "../admin/product/productSlice";
import { navToAllProduct } from "../../helpers/productFuncHelper";

export interface CommonProductProps {
  navigate: NavigateFunction;
  allProduct: ProductDataProps[];
}

const Category: React.FC<CommonProductProps> = ({  allProduct, navigate }) => {
  const dispatch = useAppDispatch();
    const productCategory = allProduct && Array.isArray(allProduct) ?  Array.from(
      new Map(
        allProduct.map((p) => [p.category, { category: p.category, image: p.imagesUrl[0], id: p.$id}])
      ).values()
    ).slice(0, 7) : [];

    
const handleCategoryNav = (name: string) => {
  dispatch(setProductCategoryName(name));
  navigate(`/allProduct`);
}
          
  return (
    <section className="border-b border-black mb-2 pb-4 animate-on-scroll px-2 sm:px-0">
      <TwoTextSpan leftText="Categories"  onClick={() => navToAllProduct(navigate)} />

      <article className="flex items-center lg:grid lg:grid-cols-7 gap-2 overflow-x-auto">

        {productCategory && Array.isArray(productCategory) && productCategory.map((item, index) => (
          <div onClick={() =>handleCategoryNav( item.category)} className="cursor-pointer" key={index}>
            <div className="h-40 w-30 lg:h-40 lg:w-32 xl:h-48 xl:w-42 flex items-center justify-center rounded-xl p-2 bg-white mb-4">
              <img
                src={item.image}
                alt="medication categories"
                className="w-46 h-auto object-fill"
              />
            </div>
            <article>
              <CustomText
                text={item.category.length > 18 ? item.category.slice(0, 18) + '...' : item.category}
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

export default Category;
