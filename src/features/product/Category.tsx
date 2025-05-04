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
  productAdmin: ProductDataProps[];
}

const Category: React.FC<CommonProductProps> = ({  productAdmin, navigate }) => {
  const dispatch = useAppDispatch();
    const productCategory = productAdmin && Array.isArray(productAdmin) ?  Array.from(
      new Map(
        productAdmin.map((p) => [p.category, { category: p.category, image: p.imagesUrl[0], id: p.$id}])
      ).values()
    ).slice(0, 7) : [];

const handleCategoryNav = (name: string) => {
  dispatch(setProductCategoryName(name));
  navigate(`/allProduct`);
}
          
  return (
    <section className="border-b border-black mb-2 pb-4 animate-on-scroll px-4 sm:px-0">
      <TwoTextSpan leftText="Categories"  onClick={() => navToAllProduct(navigate)} />

      <article className="flex items-center lg:grid lg:grid-cols-7 gap-4 overflow-x-auto">

        {productCategory && Array.isArray(productCategory) && productCategory.map((item, index) => (
          <div onClick={() =>handleCategoryNav( item.category)} className="cursor-pointer" key={index}>
            <div className="h-46 w-40 md:h-30 md:w-28 lg:h-38 lg:w-32 xl:h-48 xl:w-42 flex items-center justify-center rounded-xl p-2 bg-white mb-4">
              <img
                src={item.image}
                alt="medication categories"
                className="w-46 h-auto object-fill"
              />
            </div>
            <article>
              <CustomText
                text={item.category}
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
