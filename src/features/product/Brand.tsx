import cartImg from "../../assets/images/anti11.png";
import CustomText from "../../components/common/Text";
import SingleProduct from "../../components/product/SingleProduct";
import SingleCategoryItem from "../../components/product/SingleCategoryItem";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchAllUserProduct, searchedProduct, searchedProductBrand, selectproductAdmin } from "../admin/product/productSlice";
import { selectproduct } from "./productSlice";

const Brand = () => {
  const { name } = useParams();
  let searchedBrand = decodeURIComponent(name || '');
  const { productSearched } = useAppSelector(selectproductAdmin)
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(searchedBrand) dispatch(searchedProductBrand(searchedBrand)).then((res) => console.log('searchedBrand ', res.payload));
  }, [searchedBrand])
console.log('productSearched ', productSearched, searchedBrand)
  // text={`${name?.replace(/([a-z])([A-Z])/g, '$1 $2')}`}

  useEffect(() => {
    // start the page from the top
    window.scrollTo(0,0)
  }, [])
  return (
    <main
      className={`block mt-20 mb-1 md:grid md:grid-cols-[20%_80%] h-full pb-5 gap-2`}
    >
      {/* for mobile device */}
      <section className="md:hidden overflow-x-auto">
        <CustomText
          text={`${name}`}
          textType="medium"
          weightType="bold"
          extraStyle=" w-max mx-auto my-3"
        />
       
      </section>
      {/* for large screen size  */}
      <section className="hidden md:block p-4 bg-white">
        <div className="w-48  break-words whitespace-normal">
          <CustomText
            text={`${name}`}
            textType="medium"
            weightType="bold"
          />
          {/* product category  */}
          {/* <SingleCategoryItem name="Skin Care" />
          <SingleCategoryItem name="Fever And Pain" /> */}
        </div>
      </section>
      <section className="">
        <div className="grid grid-cols-3 gap-4">
          {/* map through cart item  */}
          {
            productSearched && Array.isArray(productSearched) && productSearched.map((p) => (
              <>
             { p && p.$id &&  ( <SingleProduct
              key={p.$id}
                id={p && p.$id}
                productImage={p && p.imagesUrl && p.imagesUrl[0]}
                textTitle={p && p.name}
                textDesc={p && p.description.slice(0, 15)}
                price={p && String(p.price)} 
                onAddCart={function (e: React.MouseEvent, id: string): void {
                  throw new Error("Function not implemented.");
                } } onAddWishlist={function (e: React.MouseEvent, id: string): void {
                  throw new Error("Function not implemented.");
                } }          
                />)}
                </>
            ))
          }
        </div>
      </section>
    </main>
  );
};

export default Brand;
