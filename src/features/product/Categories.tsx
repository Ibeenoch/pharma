import cartImg from "../../assets/images/anti11.png";
import CustomText from "../../components/common/Text";
import SingleProduct from "../../components/product/SingleProduct";
import SingleCategoryItem from "../../components/product/SingleCategoryItem";

const Categories = () => {
  return (
    <main
      className={`block mt-20 mb-1 md:grid md:grid-cols-[20%_80%] h-screen gap-2`}
    >
      {/* for mobile device */}
      <section className="md:hidden overflow-x-auto">
        <CustomText
          text="Product Categories"
          textType="medium"
          weightType="bold"
          extraStyle="border-b border-black w-max mx-auto"
        />
        <div className="flex gap-2 items-center m-2">
          <p className="text-xs font-normal text-white bg-black flex justify-center items-cennter p-2 w-max rounded-lg">
            All
          </p>
          <p className="text-xs font-normal text-white bg-gray-500 flex justify-center items-cennter p-2 w-max rounded-lg">
            Pain Killers
          </p>
        </div>
      </section>
      {/* for large screen size  */}
      <section className="hidden md:block p-4 bg-white">
        <div>
          <CustomText
            text="Product Categories"
            textType="medium"
            weightType="bold"
            extraStyle="border-b border-black w-max"
          />
          {/* product category  */}
          {/* <SingleCategoryItem name="Skin Care" />
          <SingleCategoryItem name="Fever And Pain" /> */}
        </div>
      </section>
      <section className="">
        <div className="grid grid-cols-3 gap-4">
          {/* map through cart item  */}
          <SingleProduct
            id=""
            productImage={cartImg}
            textTitle="Facial Cleaner"
            textDesc="Facial cleaner for facial treatment..."
            price="₦2500" onAddCart={function (e: React.MouseEvent, id: string): void {
              throw new Error("Function not implemented.");
            } } onAddWishlist={function (e: React.MouseEvent, id: string): void {
              throw new Error("Function not implemented.");
            } } discount={0}          />
        </div>
      </section>
    </main>
  );
};

export default Categories;
