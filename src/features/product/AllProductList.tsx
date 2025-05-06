import CustomText from "../../components/common/Text";
import SingleProduct from "../../components/product/SingleProduct";
import SingleCategoryItem from "../../components/product/SingleCategoryItem";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectproductAdmin, setProductCategoryName } from "../admin/product/productSlice";
import {
  CartProductDataProps,
  cartProps,
} from "../../types/product/ProductData";
import { addToCart, addTowishlist } from "../cart/cartSlice";
import { useEffect, useState } from "react";
import { setNavIndexLink } from "../auth/authSlice";
import { links } from "../../utils/listLink";

const AllProductList = () => {
  const { allProduct, productCategoryName } = useAppSelector(selectproductAdmin);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([productCategoryName ? productCategoryName : '']);
  const dispatch = useAppDispatch();


  // filter out only the category without any duplicate
  const productCategories = allProduct && Array.isArray(allProduct) ?  Array.from(
    new Map(
      allProduct.map((p) => [p.category, { category: p.category}])
    ).values()
  ) : []

  // add product to cart
  const handleAddToCart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const productItem = allProduct.find((item) => item.$id === id)!;
    const productCart: CartProductDataProps = {
      ...productItem,
      subtotal:
        productItem.price -
        productItem.price *
          (productItem.discount ? productItem.discount / 100 : 0),
      total:
        productItem.price -
        productItem.price *
          (productItem.discount ? productItem.discount / 100 : 0) +
        1500,
    };
    const product: cartProps = { item: productCart, qty: 1 };
    dispatch(addToCart(product));
  };
  // add product to favorite
  const handleAddToWishList = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const productItem = allProduct.find((item) => item.$id === id)!;
    const wishList = { item: productItem };
    dispatch(addTowishlist(wishList));
  };

  // filter product based on the category the user selected from the checkbox for large screens
  const handleCategoryChange = (checked: boolean, name: string) => {
    setSelectedCategories((prev) => checked ? [...prev, name] : prev.filter((n) => n !== name) );
    productCategoryName !== '' && dispatch(setProductCategoryName(''));
  }
  // filter product based on the category the user selected from the checkbox for mobile screens
  const handleCategoryClicked = ( name: string) => {
    setSelectedCategories((prev) => prev.includes(name) ?  prev.filter((n) => n !== name) : [...prev, name] );
    productCategoryName !== '' && dispatch(setProductCategoryName(''));
  }

  // filter what product to show and what not to show
  let filteredProduct = allProduct && Array.isArray(allProduct) && selectedCategories.length === 1 && selectedCategories[0] === '' ? allProduct : allProduct.filter((p) => {
    return selectedCategories.some((s) => s === p.category);
  });


  useEffect(() => {
    // when the user visit the page move the page to the top
    window.scrollTo(0,0);
    // set the correct navbar active text
    dispatch(setNavIndexLink({ name: links[1].name, index: 1 }));
  },[])
  return (
    <main
      className={`block mt-20 mb-1 md:grid md:grid-cols-[20%_80%] h-full gap-2`}
    >
      {/* for mobile device */}
      <section className="md:hidden overflow-x-auto">
        <CustomText
          text="Product Categories"
          textType="medium"
          weightType="bold"
          extraStyle="border-b border-black w-max mx-auto"
        />
        <div className="flex gap-2 items-center m-2 w-full overflow-x-auto">

        {
            productCategories && Array.isArray(productCategories) && productCategories.map((p) => (
            <span onClick={() =>handleCategoryClicked(p.category)} className={`text-xs font-normal text-white ${ selectedCategories.includes(p.category) ? 'bg-amber-500': 'bg-black' } flex justify-center items-center whitespace-nowrap p-2 w-max rounded-lg`}>
            {p.category}
          </span>           
           ))
          }
        
        </div>
      </section>
      {/* for large screen size  */}
      <section className="hidden md:block p-4 bg-white">
        <div>
          <CustomText
            text="Product Categories"
            textType="medium"
            weightType="bold"
            extraStyle=""
          />
          {/* product category  */}
          {
            productCategories && Array.isArray(productCategories) && productCategories.map((p) => (
              <SingleCategoryItem key={p.category} name={p.category} onChange={handleCategoryChange} productCategories={productCategories}  />
            ))
          }
         
        </div>
      </section>
      <section className="p-2">
       
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          
          {/* map through cart item  */}
          {filteredProduct && Array.isArray(filteredProduct) && filteredProduct.map(
            (p) =>
              p &&
              p.$id && p.discount && (
                <SingleProduct
                  id={p.$id}
                  onAddCart={handleAddToCart}
                  onAddWishlist={handleAddToWishList}
                  productImage={p.imagesUrl[0]}
                  textTitle={p.name}
                  textDesc={
                    p.description.length > 80
                      ? p.description.slice(0, 80) + "..."
                      : p.description
                  }
                  price={`${p.price}`}
                  discount={p.discount}
                />
              )
          )}
        </div>
      </section>
    </main>
  );
};

export default AllProductList;
